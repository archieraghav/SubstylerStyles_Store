import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import templates from '../data/templates';

export default function PurchasedPreview(){
  const { purchased } = useContext(StoreContext);
  const last = purchased.length ? purchased[purchased.length-1] : null;
  const t = last ? templates.find(x=>x.id===last) : templates[0];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md mt-6">
      <h3 className="font-semibold mb-2">Live Preview</h3>
      <div className="bg-black rounded-lg p-6 flex items-end justify-center" style={{minHeight:130}}>
        <div className="w-full text-center">
          <p className={`inline-block px-3 py-1 ${t?.style ?? ""} rounded-md`}>This is a sample auto-generated subtitle</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">Preview applies: {t?.name}</p>
    </div>
  );
}
