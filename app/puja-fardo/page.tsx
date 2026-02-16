"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Send, CheckCircle2, X } from 'lucide-react';

const masterItems = [
  { id: 1, name: "Sindoor", unit: "gram", qty: 50 },
  { id: 2, name: "Joba Phool", unit: "piece", qty: 108 },
  { id: 3, name: "Ghee", unit: "gram", qty: 250 },
  { id: 4, name: "Bel Pata", unit: "piece", qty: 108 },
  { id: 5, name: "Chandan", unit: "gram", qty: 25 },
  { id: 6, name: "Alpona Color", unit: "packet", qty: 1 },
  { id: 7, name: "Khori Mati", unit: "packet", qty: 2 },
  { id: 8, name: "Dhaner Chora", unit: "piece", qty: 5 },
  { id: 9, name: "Dhup", unit: "packet", qty: 1 },
  { id: 10, name: "Prodeep", unit: "piece", qty: 5 },
];

const pujaPresets: Record<string, number[]> = {
  "Kali Puja": [1, 2, 3, 9, 10],
  "Durga Puja": [3, 4, 5, 9, 10],
  "Laxmi Puja": [1, 3, 7, 8, 9, 10],
};

export default function PujaFardoPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedStates, setSelectedStates] = useState<Record<string, any>>({});
  const [isMounted, setIsMounted] = useState(false);

  // ১. Page load houar somoy LocalStorage theke data load kora
  useEffect(() => {
    const savedStates = localStorage.getItem('puja_fardo_data');
    const savedPhone = localStorage.getItem('puja_fardo_phone');
    if (savedStates) setSelectedStates(JSON.parse(savedStates));
    if (savedPhone) setPhone(savedPhone);
    setIsMounted(true); // Hydration mismatch prevent korte
  }, []);

  // ২. Jokhon-i selectedStates change hobe, seta LocalStorage-e save hobe
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('puja_fardo_data', JSON.stringify(selectedStates));
      localStorage.setItem('puja_fardo_phone', phone);
    }
  }, [selectedStates, phone, isMounted]);

  const displayItems = useMemo(() => {
    let list = masterItems.map(item => {
      const stateKey = `${activeTab}-${item.id}`;
      const isSelectedManually = selectedStates[stateKey];
      
      const isChecked = isSelectedManually !== undefined 
        ? isSelectedManually 
        : (activeTab !== "All" && pujaPresets[activeTab]?.includes(item.id));

      const customQty = selectedStates[`${stateKey}-qty`] ?? item.qty;
      const customUnit = selectedStates[`${stateKey}-unit`] ?? item.unit;

      return { ...item, checked: !!isChecked, qty: customQty, unit: customUnit };
    });

    return list.sort((a, b) => (b.checked === a.checked ? 0 : b.checked ? 1 : -1));
  }, [activeTab, selectedStates]);

  const filteredItems = displayItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (id: number) => {
    const target = displayItems.find(i => i.id === id);
    if (!target) return;
    setSelectedStates(prev => ({ 
      ...prev, 
      [`${activeTab}-${id}`]: !target.checked 
    }));
  };

  const handleUpdate = (id: number, field: 'qty' | 'unit', value: any) => {
    setSelectedStates(prev => ({ 
      ...prev, 
      [`${activeTab}-${id}-${field}`]: value 
    }));
  };

  const handleSubmit = () => {
    if (!phone) return alert("Please enter phone number");
    const selected = displayItems.filter(i => i.checked);
    if (selected.length === 0) return alert("No items selected!");

    let msg = `*Puja Fardo (${activeTab})*%0A------------------%0A`;
    selected.forEach((i, idx) => {
      msg += `${idx + 1}. ${i.name}: ${i.qty} ${i.unit}%0A`;
    });
    msg += `%0A*Phone:* ${phone}`;
    window.open(`https://wa.me/+918637824619?text=${msg}`, '_blank');
  };

  // Clear All Function: User jodi purota muche felle natun kore suru korte chay
  const clearAllData = () => {
    if(confirm("Apni ki sob selection clear korte chan?")) {
      setSelectedStates({});
      localStorage.removeItem('puja_fardo_data');
    }
  };

  if (!isMounted) return null; // Hydration mismatch avoid korte

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-2">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border">
        
        {/* Header with Search & Reset */}
        <div className="p-5 bg-orange-600 text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Puja Fardo Builder</h1>
            <button onClick={clearAllData} className="text-[10px] bg-orange-500 hover:bg-orange-700 px-2 py-1 rounded-md border border-orange-400">
              Reset All
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search items..." 
              className="w-full p-2.5 pl-10 pr-10 rounded-xl text-gray-900 text-sm outline-none shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-2.5 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tab System */}
        <div className="flex bg-orange-50 p-2 overflow-x-auto gap-1.5 border-b no-scrollbar">
          {["All", "Kali Puja", "Durga Puja", "Laxmi Puja"].map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setSearchQuery(""); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-orange-600 text-white shadow-sm' : 'text-orange-800 hover:bg-orange-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Item List with Top Selection Sorting */}
        <div className="p-3 space-y-2 overflow-y-auto bg-gray-50" style={{ maxHeight: '400px' }}>
          {filteredItems.map(item => (
            <div key={item.id} className={`p-2.5 rounded-xl border transition-all duration-300 ${item.checked ? 'border-orange-300 bg-orange-50 shadow-sm' : 'border-gray-200 bg-white'}`}>
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-3 cursor-pointer flex-1">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${item.checked ? 'bg-orange-600 border-orange-600' : 'border-gray-300'}`}>
                    {item.checked && <CheckCircle2 className="text-white w-3.5 h-3.5" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={item.checked} onChange={() => handleToggle(item.id)} />
                  <span className={`text-sm font-bold ${item.checked ? 'text-orange-900' : 'text-gray-500'}`}>{item.name}</span>
                </label>

                {item.checked && (
                  <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2">
                    <input type="number" value={item.qty} 
                      onChange={(e) => handleUpdate(item.id, 'qty', e.target.value)}
                      className="w-12 p-1 text-[11px] border rounded-md text-center font-bold text-orange-900 outline-none border-orange-200"
                    />
                    <select value={item.unit} 
                      onChange={(e) => handleUpdate(item.id, 'unit', e.target.value)}
                      className="text-[10px] p-1 border rounded-md bg-white font-bold text-orange-800 outline-none border-orange-200"
                    >
                      <option value="gram">Grm</option>
                      <option value="kg">KG</option>
                      <option value="packet">Pkt</option>
                      <option value="piece">Pc</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Section */}
        <div className="p-5 bg-white border-t">
          <input type="tel" placeholder="Your Mobile Number" 
            className="w-full p-3 border rounded-xl mb-3 outline-none text-sm bg-gray-50 border-gray-200"
            value={phone} onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSubmit} className="w-full bg-green-600 text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md active:scale-95 transition-all">
            <Send className="w-4 h-4" /> Send to WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}