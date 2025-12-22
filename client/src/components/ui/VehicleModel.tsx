import React from 'react';

export const VehicleModel: React.FC = () => {
  return (
    <div className="relative w-full aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/20 backdrop-blur-sm">
      <iframe
        title="Range Rover Concept By K E N"
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/fe8a8fd158e343e4a89103ec594c8f93/embed?ui_theme=dark&autostart=1&preload=1&transparent=1&ui_hints=0&ui_infos=0"
      ></iframe>
      
      {/* Decorative Gradient Overlay to blend the model with your dark theme */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.6)]"></div>
    </div>
  );
};