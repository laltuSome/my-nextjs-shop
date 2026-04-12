"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Send, CheckCircle2, X, Plus, Trash2, RotateCcw } from 'lucide-react';

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

const pujaPresets = {
  "Kali Puja": [1, 2, 3, 9, 10],
  "Durga Puja": [3, 4, 5, 9, 10],
  "Laxmi Puja": [1, 3, 7, 8, 9, 10],
};

export default function PujaFardoPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedStates, setSelectedStates] = useState({});
  const [customItems, setCustomItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', qty: '', unit: 'piece' });

  useEffect(() => {
    const savedStates = localStorage.getItem('puja_fardo_data');
    const savedPhone = localStorage.getItem('puja_fardo_phone');
    const savedCustoms = localStorage.getItem('puja_fardo_customs');
    if (savedStates) setSelectedStates(JSON.parse(savedStates));
    if (savedPhone) setPhone(savedPhone);
    if (savedCustoms) setCustomItems(JSON.parse(savedCustoms));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('puja_fardo_data', JSON.stringify(selectedStates));
      localStorage.setItem('puja_fardo_phone', phone);
      localStorage.setItem('puja_fardo_customs', JSON.stringify(customItems));
    }
  }, [selectedStates, phone, customItems, isMounted]);

  const displayItems = useMemo(() => {
    const allCombined = [...masterItems, ...customItems];
    
    // ট্যাব অনুযায়ী ফিল্টার (আগের মতো)
    let filtered = allCombined;
    if (activeTab !== "All") {
      const presetIds = pujaPresets[activeTab] || [];
      filtered = allCombined.filter(item => 
        presetIds.includes(item.id) || (typeof item.id === 'string' && item.id.includes('user'))
      );
    }

    let list = filtered.map(item => {
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
  }, [activeTab, selectedStates, customItems]);

  const filteredItems = displayItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (id) => {
    const stateKey = `${activeTab}-${id}`;
    const currentStatus = displayItems.find(i => i.id === id)?.checked;
    setSelectedStates(prev => ({ ...prev, [stateKey]: !currentStatus }));
  };

  const handleUpdate = (id, field, value) => {
    setSelectedStates(prev => ({ ...prev, [`${activeTab}-${id}-${field}`]: value }));
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.qty) return;
    const newId = `user-${Date.now()}`;
    const itemToAdd = { id: newId, ...newItem, isCustom: true };
    setCustomItems(prev => [...prev, itemToAdd]);
    setSelectedStates(prev => ({ ...prev, [`${activeTab}-${newId}`]: true }));
    setNewItem({ name: '', qty: '', unit: 'piece' });
    setShowPopup(false);
  };

  const handleDeleteItem = (id) => {
    if(confirm("Are you sure?")) {
      setCustomItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // রিসেট বাটন ফাংশন
  const handleReset = () => {
    if(confirm("Reset everything? Your custom items and selections will be cleared.")) {
      setSelectedStates({});
      setCustomItems([]);
      localStorage.removeItem('puja_fardo_data');
      localStorage.removeItem('puja_fardo_customs');
    }
  };

  const handleSubmit = () => {
    if (!phone) return alert("Please enter phone number");
    const selected = displayItems.filter(i => i.checked);
    if (selected.length === 0) return alert("No items selected!");
    
    let msg = `*Puja Fardo (${activeTab})*%0A------------------%0A`;
    selected.forEach((i, idx) => { msg += `${idx + 1}. ${i.name}: ${i.qty} ${i.unit}%0A`; });
    msg += `%0A*Phone:* ${phone}`;
    window.open(`https://wa.me/+91${phone}?text=${msg}`, '_blank');
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-2 flex flex-col items-center relative">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden border relative z-10">
        
        {/* Header */}
        <div className="p-5 bg-orange-600 text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-black tracking-tighter">RUDRAANJALI STORE</h1>
            <button onClick={handleReset} className="flex items-center gap-1 text-[10px] bg-orange-700/50 hover:bg-red-600 border border-orange-400 px-2 py-1 rounded-lg transition-all font-bold">
              <RotateCcw className="w-3 h-3" /> RESET ALL
            </button>
          </div>
          <div className="relative">
            <input type="text" placeholder="Search puja items..." className="w-full p-2.5 pl-10 rounded-xl text-gray-900 text-sm outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-orange-50 p-2 overflow-x-auto gap-1.5 border-b no-scrollbar">
          {["All", "Kali Puja", "Durga Puja", "Laxmi Puja"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`px-4 py-1.5 rounded-lg text-[11px] font-black transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-orange-600 text-white shadow-md' : 'text-orange-800 hover:bg-orange-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List Section */}
        <div className="p-3 space-y-2 overflow-y-auto bg-gray-50" style={{ height: '400px' }}>
          {filteredItems.map(item => (
            <div key={item.id} className={`p-3 rounded-xl border transition-all ${item.checked ? 'border-orange-300 bg-orange-50 shadow-sm' : 'border-gray-200 bg-white'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 flex-1" onClick={() => handleToggle(item.id)}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${item.checked ? 'bg-orange-600 border-orange-600' : 'border-gray-300'}`}>
                    {item.checked && <CheckCircle2 className="text-white w-3.5 h-3.5" />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${item.checked ? 'text-orange-900' : 'text-gray-600'}`}>{item.name}</span>
                    {item.isCustom && <span className="text-[8px] text-orange-400 font-bold uppercase mt-0.5 italic">Added by you</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.checked && (
                    <div className="flex items-center gap-1 bg-white p-1 rounded-md border border-orange-100">
                      <input type="number" value={item.qty} onChange={(e) => handleUpdate(item.id, 'qty', e.target.value)} className="w-10 p-0.5 text-[11px] text-center font-bold text-orange-900 outline-none" />
                      <select value={item.unit} onChange={(e) => handleUpdate(item.id, 'unit', e.target.value)} className="text-[10px] font-bold text-orange-700 bg-transparent outline-none">
                        <option value="piece">Pc</option><option value="gram">Gm</option><option value="kg">KG</option><option value="packet">Pkt</option>
                      </select>
                    </div>
                  )}
                  {item.isCustom && (
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }} className="p-1.5 text-red-400 hover:text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button onClick={() => setShowPopup(true)} className="w-full mt-4 py-3 border-2 border-dashed border-orange-200 rounded-2xl text-orange-500 font-bold flex items-center justify-center gap-2 hover:bg-orange-50 transition-all">
            <Plus className="w-5 h-5" /> Add Extra Item
          </button>
        </div>

        {/* Footer */}
        <div className="p-5 bg-white border-t">
          <input type="tel" placeholder="Customer Mobile Number" className="w-full p-3 border rounded-xl mb-3 outline-none text-sm bg-gray-50 font-bold" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button onClick={handleSubmit} className="w-full bg-green-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all text-xs tracking-widest uppercase">
            <Send className="w-4 h-4" /> SEND ON WHATSAPP
          </button>
        </div>
      </div>

      {/* PopUp Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl border border-orange-100 scale-in-center animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-orange-600 uppercase italic">Add Item</h2>
              <button onClick={() => setShowPopup(false)} className="p-1 bg-gray-100 rounded-full text-gray-400"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <input autoFocus type="text" placeholder="Item Name" className="w-full p-3 border rounded-xl outline-none focus:border-orange-500 bg-gray-50 text-sm font-bold shadow-inner" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} />
              <div className="flex gap-2">
                <input type="number" placeholder="Qty" className="flex-1 p-3 border rounded-xl outline-none focus:border-orange-500 bg-gray-50 text-sm font-bold shadow-inner" value={newItem.qty} onChange={(e) => setNewItem({...newItem, qty: e.target.value})} />
                <select className="w-24 p-3 border rounded-xl outline-none bg-orange-50 text-xs font-black text-orange-700 shadow-inner" value={newItem.unit} onChange={(e) => setNewItem({...newItem, unit: e.target.value})}>
                  <option value="piece">Piece</option><option value="gram">Gram</option><option value="kg">KG</option><option value="packet">Pkt</option>
                </select>
              </div>
              <button onClick={handleAddItem} className="w-full bg-orange-600 text-white font-black py-4 rounded-xl mt-2 shadow-lg active:scale-95 transition-all">SAVE TO LIST</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}