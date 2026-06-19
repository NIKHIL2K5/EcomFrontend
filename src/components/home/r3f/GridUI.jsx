import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Spring config reused across state transitions (opacity/scale only — composited, no layout cost)
const fade = { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.92 }, transition: { duration: 0.18 } };

export function UnifiedControlBar({
    currentCollection,
    onSwitch,
    setZoomTrigger,
    isZoomedIn,
    hasActiveSelection,
    activeFilter,
    onFilterChange,
    onShopNow,
}) {
    const collections = ['Running', 'Sneakers', 'Under ₹2500'];
    const runningFilters = [
        { id: 'all', label: 'All' },
        { id: 'nitro', label: 'Nitro' },
        { id: 'new', label: 'New' },
    ];

    return (
        <div style={{ position: 'absolute', bottom: '32px', left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', zIndex: 100, pointerEvents: 'none' }}>
            {/* Island container — CSS transition for width (no JS layout measurement) */}
            <div
                style={{
                    background: 'linear-gradient(135deg,rgba(255,240,235,.4) 0%,rgba(255,255,255,.3) 50%,rgba(245,235,255,.4) 100%)',
                    backdropFilter: 'blur(40px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                    borderRadius: '32px',
                    border: '1px solid rgba(255,255,255,.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.5)',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    pointerEvents: 'auto',
                    height: '56px',
                    overflow: 'hidden',
                    transition: 'width 0.3s cubic-bezier(.3,1.2,.4,1)',
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {hasActiveSelection ? (
                        <motion.button key="shop-now" {...fade}
                            onClick={onShopNow}
                            style={{ background: '#000', color: '#fff', border: 'none', borderRadius: '24px', padding: '0 24px', height: '44px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}
                        >
                            Shop Now →
                        </motion.button>
                    ) : isZoomedIn ? (
                        <motion.div key="compact" {...fade} style={{ display: 'flex' }}>
                            <ControlButton icon="remove" onClick={() => setZoomTrigger('OUT')} label="Zoom Out" />
                        </motion.div>
                    ) : (
                        <motion.div key="expanded" {...fade} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ControlButton icon="add" onClick={() => setZoomTrigger(12)} label="Zoom In" />
                            <Divider />
                            <div style={{ display: 'flex', gap: '2px' }}>
                                {collections.map((name, index) => (
                                    <TabButton key={name} isActive={currentCollection === index} onClick={() => onSwitch(index)}>
                                        {name}
                                    </TabButton>
                                ))}
                            </div>
                            {currentCollection === 0 && (
                                <div className="sg-desktop-filters" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Divider />
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {runningFilters.map(f => (
                                            <FilterChip key={f.id} isActive={activeFilter === f.id} onClick={() => onFilterChange(f.id)}>
                                                {f.label}
                                            </FilterChip>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile running filters */}
            <AnimatePresence>
                {currentCollection === 0 && !isZoomedIn && !hasActiveSelection && (
                    <motion.div
                        className="sg-mobile-filters"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'absolute', bottom: '70px', left: 0, right: 0, display: 'none', justifyContent: 'center', pointerEvents: 'none' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,.3)', boxShadow: '0 4px 20px rgba(0,0,0,.08)', padding: '6px 8px', pointerEvents: 'auto' }}>
                            {runningFilters.map(f => (
                                <FilterChip key={`m-${f.id}`} isActive={activeFilter === f.id} onClick={() => onFilterChange(f.id)}>
                                    {f.label}
                                </FilterChip>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .sg-desktop-filters { display: flex; align-items: center; }
                .sg-mobile-filters { display: none !important; }
                @media (max-width: 768px) {
                    .sg-desktop-filters { display: none !important; }
                    .sg-mobile-filters { display: flex !important; }
                }
            `}</style>
        </div>
    );
}

function Divider() {
    return <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,.08)', margin: '0 2px', flexShrink: 0 }} />;
}

function ControlButton({ onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'transparent', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: 'none', transition: 'background 0.15s ease' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            aria-label={label}
        >
            {icon === 'add' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            )}
        </button>
    );
}

function TabButton({ children, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                border: 'none',
                background: isActive ? 'rgba(255,255,255,.6)' : 'transparent',
                backdropFilter: isActive ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: isActive ? 'blur(20px)' : 'none',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.6)' : 'none',
                color: isActive ? '#000' : '#666',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
            }}
        >
            {children}
        </button>
    );
}

function FilterChip({ children, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                border: 'none',
                background: isActive ? 'rgba(0,0,0,.85)' : 'rgba(0,0,0,.05)',
                color: isActive ? '#fff' : '#555',
                padding: '6px 12px',
                borderRadius: '14px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s ease, color 0.2s ease',
            }}
        >
            {children}
        </button>
    );
}
