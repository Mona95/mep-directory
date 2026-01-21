import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface CampaignPageProps {
    campaignId: string;
    title: string;
    description: string;
}

export function CampaignPage({ campaignId, title, description }: CampaignPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Back to directory */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-blue-300 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to MEP Directory</span>
                </Link>

                {/* Campaign Header */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 mb-6 border border-white/10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {title}
                    </h1>
                    <p className="text-blue-200 text-lg mb-6">
                        {description}
                    </p>

                    {/* Placeholder content */}
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
                        <p className="text-yellow-200 text-center">
                            Campaign page for <strong>{campaignId}</strong> - Coming soon
                        </p>
                        <p className="text-yellow-200/70 text-center text-sm mt-2">
                            This page will include email templates, target MEPs, and one-click compose functionality.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-blue-300/40 mt-6">
                    MEP Email Directory • Advocacy made accessible
                </p>
            </div>
        </div>
    );
}
