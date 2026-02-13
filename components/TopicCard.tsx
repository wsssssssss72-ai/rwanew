
import React from 'react';
import { Link } from 'react-router-dom';

interface TopicCardProps {
    topic: any;
    batchId: string;
    subjectId: string;
    subjectName: string;
    batchName: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, batchId, subjectId, subjectName, batchName }) => {
    return (
        <Link 
            to={`/batch/${batchId}/subject/${subjectId}/topic/${topic.topicid}`}
            state={{ topicName: topic.topic_name, subjectName, batchName }}
            className="group flex items-center gap-4 p-4 bg-[#121214] border border-zinc-700/50 rounded-[1.5rem] hover:border-[#7B2FF7] transition-all active:scale-[0.98]"
        >
            {/* Folder Icon (Matches Screenshot) */}
            <div className="shrink-0 flex items-center justify-center">
                <div className="relative">
                    <i className="fas fa-folder text-3xl text-yellow-500 drop-shadow-lg"></i>
                    {/* Tiny accent color for folder interior appearance */}
                    <div className="absolute top-[30%] left-[20%] w-[40%] h-[15%] bg-white/10 rounded-sm"></div>
                </div>
            </div>

            {/* Topic/Lesson Name */}
            <div className="flex-1 px-1">
                <h4 className="font-bold text-[15px] md:text-[16px] text-white group-hover:text-[#7B2FF7] transition-colors line-clamp-1 leading-tight">
                    {topic.topic_name}
                </h4>
            </div>

            {/* Empty right area to match the simplified screenshot look */}
            <div className="w-2"></div>
        </Link>
    );
};

export default TopicCard;
