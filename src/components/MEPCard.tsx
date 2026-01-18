import { Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { GROUP_INFO } from '../constants/groups';
import type { MEP, CopiedState } from '../types';

interface MEPCardProps {
    mep: MEP;
    copied: CopiedState;
    onCopy: (email: string, id: number) => void;
}

export function MEPCard({ mep, copied, onCopy }: MEPCardProps) {
    const groupStyle = GROUP_INFO[mep.group as keyof typeof GROUP_INFO]?.color || 'bg-gray-100 text-gray-800';
    const isCopied = copied === mep.id;
    const hasEmail = mep.email && mep.email.length > 0;

    return (
        <div className="bg-white/5 backdrop-blur rounded-xl p-4 hover:bg-white/10 transition-all border border-white/5 hover:border-white/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* MEP Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {mep.photoUrl && (
                        <img
                            src={mep.photoUrl}
                            alt={mep.name}
                            className="w-12 h-12 rounded-full object-cover bg-white/10 shrink-0"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    )}
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-white">{mep.name}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${groupStyle}`}>
                {mep.group}
              </span>
                        </div>
                        <p className="text-sm text-blue-200/60 mt-0.5">{mep.country}</p>
                    </div>
                </div>

                {/* Email & Actions */}
                <div className="flex items-center gap-2">
                    {hasEmail ? (
                        <>
                            {/* Email display */}
                            <a
                                href={`mailto:${mep.email}`}
                                className="flex-1 sm:flex-none inline-flex items-center gap-2 px-3 py-2 bg-white/10 text-blue-200 rounded-lg hover:bg-white/20 transition-colors text-sm font-mono truncate max-w-[280px]"
                            >
                                <Mail size={14} className="shrink-0" />
                                <span className="truncate">{mep.email}</span>
                            </a>

                            {/* Copy button */}
                            <button
                                onClick={() => onCopy(mep.email, mep.id)}
                                className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                title="Copy email"
                            >
                                {isCopied ? (
                                    <Check size={18} className="text-green-400" />
                                ) : (
                                    <Copy size={18} />
                                )}
                            </button>
                        </>
                    ) : (
                        /* No email - link to EP page */
                        <a
                            href={mep.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 text-blue-200 rounded-lg hover:bg-white/20 transition-colors text-sm"
                        >
                            <Mail size={14} />
                            <span>View on EP</span>
                            <ExternalLink size={12} />
                        </a>
                    )}

                    {/* EP profile link */}
                    {hasEmail && (
                        <a
                            href={mep.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="View on europarl.europa.eu"
                        >
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}