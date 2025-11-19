import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UserProfile, AppView, ChatSession, Message, Gender } from './types';
import { MOCK_USERS, INITIAL_FREE_CHATS, INTERESTS_LIST } from './constants';
import { Button } from './components/Button';
import { generateAiBio } from './services/geminiService';
import { 
  MapPin, 
  User, 
  MessageCircle, 
  ShoppingBag, 
  Settings as SettingsIcon, 
  Send, 
  Camera, 
  Mic, 
  Image as ImageIcon, 
  LogOut, 
  Edit2,
  X,
  CheckCircle,
  CreditCard,
  Ghost,
  Sparkles,
  UserMinus,
  ShieldAlert,
  Check,
  CheckCheck,
  Bell,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

// --- Helper for Status ---
const getStatusColor = (status: UserProfile['status']) => {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'away': return 'bg-yellow-500';
    case 'offline': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

// --- Components Defined Inline for Single File Structure Requirement ---

// 1. Auth Component
const AuthView = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-500 to-purple-600 p-6">
    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-brand-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">VibeConnect</h1>
      <p className="text-gray-500 mb-8">Find your vibe, meet people nearby.</p>
      
      <Button 
        onClick={onLogin} 
        fullWidth 
        className="mb-4 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Sign in with Google
      </Button>
      <p className="text-xs text-gray-400 mt-4">By signing up, you agree to our Terms & Privacy Policy.</p>
    </div>
  </div>
);

// 2. Profile Setup Component
const ProfileSetupView = ({ 
  user, 
  onSave 
}: { 
  user: Partial<UserProfile>, 
  onSave: (u: Partial<UserProfile>) => void 
}) => {
  const [formData, setFormData] = useState<Partial<UserProfile>>(user);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAiBio = async () => {
    if (!formData.interests?.length || !formData.age || !formData.gender) {
      alert("Please fill in Age, Gender, and Interests first!");
      return;
    }
    setIsGenerating(true);
    const bio = await generateAiBio(formData.interests, formData.age, formData.gender.toString());
    setFormData(prev => ({ ...prev, about: bio }));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Your Profile</h2>
        
        <div className="space-y-6">
          {/* Photo Placeholder */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-lg">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-full h-full p-6 text-gray-400" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-brand-600 p-2 rounded-full text-white cursor-pointer hover:bg-brand-700 shadow-md">
                <Camera size={18} />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Fake upload
                    const url = URL.createObjectURL(file);
                    handleChange('avatarUrl', url);
                  }
                }} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={formData.username || ''} 
              onChange={e => handleChange('username', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              placeholder="CoolKid99"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input 
                type="number" 
                value={formData.age || ''} 
                onChange={e => handleChange('age', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                value={formData.gender || Gender.Male} 
                onChange={e => handleChange('gender', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl"
              >
                {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interests (comma separated)</label>
            <input 
              type="text" 
              value={formData.interests?.join(', ') || ''} 
              onChange={e => handleChange('interests', e.target.value.split(',').map(s => s.trim()))}
              className="w-full p-3 border border-gray-300 rounded-xl"
              placeholder="Hiking, Gaming, Sushi"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">About Me</label>
              <button 
                onClick={handleAiBio}
                disabled={isGenerating}
                className="text-xs text-brand-600 font-medium flex items-center hover:underline"
              >
                <Sparkles size={14} className="mr-1" />
                {isGenerating ? 'Writing...' : 'AI Write for me'}
              </button>
            </div>
            <textarea 
              value={formData.about || ''} 
              onChange={e => handleChange('about', e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500"
              placeholder="Tell us about yourself..."
            />
          </div>

          <Button fullWidth onClick={() => onSave(formData)}>Complete Profile</Button>
        </div>
      </div>
    </div>
  );
};

// 3. Nearby Users Component
const NearbyView = ({ 
  users, 
  onChat, 
  currentUserLocation 
}: { 
  users: UserProfile[], 
  onChat: (userId: string) => void,
  currentUserLocation?: { latitude: number, longitude: number }
}) => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(60);
  const [maxDistance, setMaxDistance] = useState(50); // km
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'age_asc' | 'distance'>('relevance');

  // Helper to calculate distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  // Filter and Sort Logic
  const processedUsers = users
    .map(user => {
      const distance = currentUserLocation && user.location 
        ? calculateDistance(
            currentUserLocation.latitude, 
            currentUserLocation.longitude, 
            user.location.latitude, 
            user.location.longitude
          )
        : 0; // default to 0 if no loc (though we expect loc)
      return { ...user, distance };
    })
    .filter(user => {
      const isAgeMatch = user.age >= ageMin && user.age <= ageMax;
      const isDistanceMatch = user.distance <= maxDistance;
      const isInterestMatch = selectedInterests.length === 0 
        || user.interests.some(i => selectedInterests.includes(i));
      return isAgeMatch && isDistanceMatch && isInterestMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'age_asc') return a.age - b.age;
      if (sortBy === 'distance') return a.distance - b.distance;
      // Relevance: prioritize users with matching interests
      if (sortBy === 'relevance' && selectedInterests.length > 0) {
         const aCount = a.interests.filter(i => selectedInterests.includes(i)).length;
         const bCount = b.interests.filter(i => selectedInterests.includes(i)).length;
         return bCount - aCount;
      }
      return 0;
    });

  return (
    <div className="pb-24 p-4">
      <header className="mb-6 flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Nearby People</h2>
           {currentUserLocation && (
             <div className="flex items-center text-xs text-gray-500 mt-1">
               <MapPin size={12} className="mr-1 text-brand-500" />
               Within {maxDistance} km
             </div>
           )}
        </div>
        <button 
          onClick={() => setShowFilters(true)}
          className="p-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 shadow-sm relative"
        >
          <SlidersHorizontal size={20} />
          {(selectedInterests.length > 0 || ageMin > 18 || ageMax < 60) && (
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-500 rounded-full border-2 border-white"></span>
          )}
        </button>
      </header>

      {/* Filter Modal/Overlay */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-200">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold">Filters</h3>
               <button onClick={() => setShowFilters(false)} className="p-1 text-gray-400 hover:text-gray-600">
                 <X size={24} />
               </button>
             </div>

             <div className="space-y-6">
               {/* Sort */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                 <div className="relative">
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="age_asc">Age (Youngest First)</option>
                      <option value="distance">Distance (Nearest)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={16} />
                 </div>
               </div>

               {/* Age Range */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Age Range ({ageMin} - {ageMax})</label>
                 <div className="flex gap-4 items-center">
                   <input 
                      type="number" 
                      min="18" 
                      max={ageMax}
                      value={ageMin} 
                      onChange={e => setAgeMin(Number(e.target.value))}
                      className="w-20 p-2 border rounded-lg text-center"
                   />
                   <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                   <input 
                      type="number" 
                      min={ageMin} 
                      max="100"
                      value={ageMax} 
                      onChange={e => setAgeMax(Number(e.target.value))}
                      className="w-20 p-2 border rounded-lg text-center"
                   />
                 </div>
               </div>

               {/* Distance */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Distance: {maxDistance} km</label>
                 <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={maxDistance} 
                    onChange={e => setMaxDistance(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                 />
                 <div className="flex justify-between text-xs text-gray-400 mt-1">
                   <span>1 km</span>
                   <span>100 km</span>
                 </div>
               </div>

               {/* Interests */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                 <div className="flex flex-wrap gap-2">
                   {INTERESTS_LIST.map(interest => (
                     <button
                       key={interest}
                       onClick={() => toggleInterest(interest)}
                       className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                         selectedInterests.includes(interest)
                           ? 'bg-brand-100 border-brand-200 text-brand-800 font-medium'
                           : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                       }`}
                     >
                       {interest}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="pt-4 flex gap-3">
                 <Button variant="outline" fullWidth onClick={() => {
                    setAgeMin(18);
                    setAgeMax(60);
                    setMaxDistance(50);
                    setSelectedInterests([]);
                    setSortBy('relevance');
                 }}>
                   Reset
                 </Button>
                 <Button fullWidth onClick={() => setShowFilters(false)}>
                   Apply Filters
                 </Button>
               </div>
             </div>
          </div>
        </div>
      )}

      {processedUsers.length === 0 ? (
         <div className="text-center py-20 text-gray-500">
           <User size={48} className="mx-auto mb-4 text-gray-300" />
           <p>No matching profiles found.</p>
           <button onClick={() => setShowFilters(true)} className="text-brand-600 font-medium mt-2">Adjust Filters</button>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processedUsers.map(user => (
            <div key={user.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow relative">
              <div className="h-48 bg-gray-200 relative">
                <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{user.username}, {user.age}</h3>
                </div>
                {/* Distance Badge */}
                {user.distance !== undefined && (
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <MapPin size={10} className="mr-1" />
                    {user.distance.toFixed(1)} km
                  </div>
                )}
                {/* Status Badge */}
                <div 
                   className={`absolute top-3 left-3 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)} shadow-sm`}
                   title={user.status}
                ></div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{user.about}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {user.interests.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded-md">{tag}</span>
                  ))}
                </div>
                <Button variant="outline" fullWidth onClick={() => onChat(user.id)} className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  Say Hello
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 4. Chat List Component
const ChatListView = ({ 
  sessions, 
  users, 
  onSelectChat 
}: { 
  sessions: ChatSession[], 
  users: UserProfile[], 
  onSelectChat: (sessionId: string) => void 
}) => {
  return (
    <div className="pb-24 p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
      <div className="space-y-2">
        {sessions.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Ghost size={48} className="mx-auto mb-4 opacity-20" />
            <p>No chats yet. Go find someone!</p>
          </div>
        ) : (
          sessions.map(session => {
            const otherUser = users.find(u => u.id === session.participantId);
            const lastMsg = session.messages[session.messages.length - 1];
            if (!otherUser) return null;

            return (
              <div 
                key={session.id} 
                onClick={() => onSelectChat(session.id)}
                className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                   <img src={otherUser.avatarUrl} alt={otherUser.username} className="w-12 h-12 rounded-full object-cover" />
                   <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(otherUser.status)}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{otherUser.username}</h3>
                    <span className="text-xs text-gray-400">
                      {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 truncate flex-1">
                      {lastMsg?.type === 'text' ? lastMsg.content : `Sent a ${lastMsg?.type}`}
                    </p>
                    {lastMsg?.senderId === 'current_user' && (
                       <span className="ml-2">
                         {lastMsg.status === 'read' ? <CheckCheck size={14} className="text-brand-500"/> : 
                          lastMsg.status === 'delivered' ? <CheckCheck size={14} className="text-gray-400"/> :
                          <Check size={14} className="text-gray-300"/>}
                       </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// 5. Chat Room Component
const ChatRoomView = ({ 
  session, 
  otherUser, 
  onBack, 
  onSend,
  onBlock
}: { 
  session: ChatSession, 
  otherUser: UserProfile, 
  onBack: () => void, 
  onSend: (content: string, type: Message['type']) => void,
  onBlock: (userId: string) => void
}) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [session.messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input, 'text');
    setInput('');
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onSend(url, type);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-600" />
          </button>
          <div className="relative">
             <img src={otherUser.avatarUrl} alt={otherUser.username} className="w-10 h-10 rounded-full object-cover" />
             <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${getStatusColor(otherUser.status)}`}></div>
          </div>
          <div>
             <h3 className="font-bold text-gray-900 leading-tight">{otherUser.username}</h3>
             <span className="text-[10px] text-gray-500 flex items-center gap-1">
                {otherUser.status.charAt(0).toUpperCase() + otherUser.status.slice(1)}
             </span>
          </div>
        </div>
        <button 
          onClick={() => {
            if (window.confirm(`Are you sure you want to block ${otherUser.username}?`)) {
              onBlock(otherUser.id);
            }
          }}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
          title="Block User"
        >
          <UserMinus size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {session.messages.map(msg => {
          const isMe = msg.senderId === 'current_user';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${isMe ? 'bg-brand-600 text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm rounded-bl-none'}`}>
                {msg.type === 'text' && <p>{msg.content}</p>}
                {msg.type === 'image' && <img src={msg.content} alt="shared" className="rounded-lg max-w-full" />}
                {msg.type === 'video' && <video src={msg.content} controls className="rounded-lg max-w-full" />}
                {msg.type === 'audio' && <audio src={msg.content} controls className="w-full" />}
                
                <div className={`flex items-center justify-end gap-1 mt-1 ${isMe ? 'text-brand-200' : 'text-gray-400'}`}>
                   <span className="text-[10px]">
                      {new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                   </span>
                   {isMe && (
                      msg.status === 'read' ? <CheckCheck size={14} className="text-blue-200" /> : 
                      msg.status === 'delivered' ? <CheckCheck size={14} className="text-brand-200/70" /> :
                      <Check size={14} className="text-brand-200/70" />
                   )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-3 border-t border-gray-200 flex items-center gap-2">
         {/* Media Actions */}
         <div className="flex gap-1">
            <label className="p-2 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer">
              <ImageIcon size={20} />
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFile(e, 'image')} />
            </label>
             <label className="p-2 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer">
              <Camera size={20} />
              <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFile(e, 'video')} />
            </label>
         </div>

        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-brand-500"
        />

        {input.trim() ? (
          <button onClick={handleSend} className="p-2 bg-brand-600 text-white rounded-full hover:bg-brand-700">
            <Send size={20} />
          </button>
        ) : (
          <button 
            onClick={() => {
              setIsRecording(!isRecording);
              if(isRecording) {
                 // Simulate stopping recording and sending
                 onSend('https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav', 'audio');
              }
            }} 
            className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            <Mic size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

// 6. Store Component
const StoreView = ({ 
  credits, 
  packages, 
  onBuy 
}: { 
  credits: number, 
  packages: any[], 
  onBuy: (pkgId: string) => void 
}) => {
  return (
    <div className="pb-24 p-4">
      <div className="bg-brand-600 rounded-3xl p-6 text-white mb-8 text-center shadow-lg">
        <p className="text-brand-100 text-sm mb-1">Current Balance</p>
        <h2 className="text-5xl font-bold mb-2">{credits}</h2>
        <p className="text-brand-100">Credits Available</p>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4">Top Up Credits</h3>
      <div className="space-y-4">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center border border-gray-100">
            <div>
              <h4 className="font-bold text-lg text-gray-800">{pkg.credits} Credits</h4>
              <span className="text-xs text-brand-600 font-semibold bg-brand-50 px-2 py-1 rounded-md">{pkg.label}</span>
            </div>
            <Button onClick={() => onBuy(pkg.id)}>
              Buy for ₹{pkg.price}
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-gray-100 p-4 rounded-xl text-xs text-gray-500">
        <p className="flex items-center gap-2 mb-2"><CheckCircle size={14} className="text-green-600"/> Secure Payment via Credit Card / UPI</p>
        <p className="flex items-center gap-2"><CheckCircle size={14} className="text-green-600"/> Instant Credit to Account</p>
      </div>
    </div>
  );
};

// 7. Settings Component
const SettingsView = ({ 
  user, 
  blockedUsers,
  onUpdate, 
  onLogout,
  onUnblock,
  onRequestNotification
}: { 
  user: UserProfile, 
  blockedUsers: UserProfile[],
  onUpdate: (u: Partial<UserProfile>) => void, 
  onLogout: () => void,
  onUnblock: (id: string) => void,
  onRequestNotification: () => void
}) => {
  return (
    <div className="pb-24 p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
           <div>
             <h3 className="font-medium text-gray-900">Status</h3>
             <p className="text-xs text-gray-500">Set your availability</p>
           </div>
           <select 
              value={user.status} 
              onChange={(e) => onUpdate({status: e.target.value as any})}
              className="text-sm border-gray-200 bg-gray-50 rounded-lg p-2 outline-none focus:ring-2 focus:ring-brand-500"
           >
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="offline">Offline</option>
           </select>
        </div>

        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
           <div>
             <h3 className="font-medium text-gray-900">Discovery Visibility</h3>
             <p className="text-xs text-gray-500">Show me to nearby users</p>
           </div>
           <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
             <input type="checkbox" name="toggle" id="toggle" checked={user.isVisible} onChange={e => onUpdate({isVisible: e.target.checked})} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
             <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${user.isVisible ? 'bg-brand-500' : 'bg-gray-300'}`}></label>
           </div>
        </div>
        <div className="p-4 flex justify-between items-center">
           <div>
             <h3 className="font-medium text-gray-900">Pause Account</h3>
             <p className="text-xs text-gray-500">Temporarily hide profile</p>
           </div>
            <input type="checkbox" checked={user.isPaused} onChange={e => onUpdate({isPaused: e.target.checked})} className="h-5 w-5 text-brand-600 rounded"/>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-between items-center cursor-pointer" onClick={onRequestNotification}>
           <div className="flex items-center gap-2">
             <Bell size={18} className="text-brand-600"/>
             <div>
                <h3 className="font-medium text-gray-900">Notifications</h3>
                <p className="text-xs text-gray-500">Enable push alerts</p>
             </div>
           </div>
           <span className="text-xs text-blue-500 font-medium">Test</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
           <ShieldAlert size={18} className="text-brand-600"/>
           <h3 className="font-medium text-gray-900">Blocked Users</h3>
        </div>
        {blockedUsers.length === 0 ? (
           <p className="p-4 text-sm text-gray-400 text-center">No blocked users</p>
        ) : (
           <div className="divide-y divide-gray-100">
              {blockedUsers.map(u => (
                 <div key={u.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <img src={u.avatarUrl} className="w-8 h-8 rounded-full object-cover"/>
                       <span className="text-sm font-medium">{u.username}</span>
                    </div>
                    <button onClick={() => onUnblock(u.id)} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
                       Unblock
                    </button>
                 </div>
              ))}
           </div>
        )}
      </div>

      <div className="space-y-3">
        <Button variant="outline" fullWidth className="justify-start" onClick={() => alert("Edit Profile Clicked")}>
          <Edit2 size={18} className="mr-3" /> Edit Profile
        </Button>
        <Button variant="outline" fullWidth className="justify-start" onClick={() => alert("Payment Methods")}>
          <CreditCard size={18} className="mr-3" /> Payment Methods
        </Button>
        <Button variant="ghost" fullWidth className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={onLogout}>
          <LogOut size={18} className="mr-3" /> Sign Out
        </Button>
        
        <div className="pt-8">
           <Button variant="danger" fullWidth onClick={() => { if(confirm("Delete account?")) onLogout(); }}>
             Delete Account
           </Button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  // State
  const [view, setView] = useState<AppView>('auth');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [nearbyUsers, setNearbyUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [location, setLocation] = useState<{latitude: number, longitude: number} | undefined>(undefined);
  const [packages] = useState(import('./constants').then(m => m.CREDIT_PACKAGES)); 

  // Refs for accessing state in async callbacks (like notifications)
  const viewRef = useRef(view);
  const activeSessionIdRef = useRef(activeSessionId);

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  useEffect(() => {
    activeSessionIdRef.current = activeSessionId;
  }, [activeSessionId]);
  
  // Load credit packages
  const CREDIT_PACKAGES = [
     { id: 'pkg_5', credits: 5, price: 250, label: 'Starter' },
     { id: 'pkg_10', credits: 10, price: 500, label: 'Popular' },
     { id: 'pkg_20', credits: 20, price: 1000, label: 'Pro' },
  ];

  // Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude: latitude,
            longitude: longitude
          });
          
          // Update mock users to be randomly distributed near this location (approx within 10km)
          // 1 degree lat ~= 111km, so 0.1 ~= 11km
          setNearbyUsers(prev => prev.map(u => ({
            ...u,
            location: {
              latitude: latitude + (Math.random() - 0.5) * 0.1, 
              longitude: longitude + (Math.random() - 0.5) * 0.1
            }
          })));
        },
        (error) => console.error("Location error", error)
      );
    }
  }, []);

  // Notification Logic
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
       const permission = await Notification.requestPermission();
       console.log("Notification permission:", permission);
       return permission;
    }
    return 'denied';
  }, []);

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      try {
        new Notification(title, options);
      } catch (e) {
        console.error("Failed to send notification", e);
      }
    }
  };

  // Login Handler
  const handleLogin = async () => {
    // Simulate Google Login success
    const newUser: UserProfile = {
      id: 'current_user',
      username: '',
      email: 'guest@gmail.com',
      gender: Gender.Male, 
      age: 18,
      about: '',
      interests: [],
      credits: 0, 
      isVisible: true,
      isPaused: false,
      blockedUserIds: [],
      status: 'online'
    };
    setUser(newUser);
    setView('profile-setup');
    
    // Request permissions
    await requestNotificationPermission();
  };

  // Simulate Random Incoming Chat Request (e.g. 15 seconds after login)
  useEffect(() => {
    if (user && view !== 'auth') {
       const timer = setTimeout(() => {
          // Find a user we haven't chatted with yet
          const existingParticipants = sessions.map(s => s.participantId);
          const availableUsers = nearbyUsers.filter(u => !existingParticipants.includes(u.id) && u.id !== user.id && !user.blockedUserIds.includes(u.id));
          
          if (availableUsers.length > 0) {
            const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
            
            const newSession: ChatSession = {
               id: `session_${Date.now()}`,
               participantId: randomUser.id,
               messages: [{
                  id: `msg_${Date.now()}`,
                  senderId: randomUser.id,
                  content: "Hey! I saw you nearby. Want to chat?",
                  type: 'text',
                  timestamp: Date.now(),
                  status: 'delivered' // Incoming message is delivered
               }],
               lastMessageTimestamp: Date.now(),
               unreadCount: 1
            };

            setSessions(prev => [...prev, newSession]);
            
            sendNotification(`New Chat Request from ${randomUser.username}`, {
               body: "Hey! I saw you nearby. Want to chat?",
               icon: randomUser.avatarUrl
            });
          }
       }, 15000); // 15 seconds
       
       return () => clearTimeout(timer);
    }
  }, [user, nearbyUsers]); // Note: sessions isn't in dependency to avoid re-triggering constantly, user login triggers this once essentially.

  // Save Profile
  const handleSaveProfile = (data: Partial<UserProfile>) => {
    setUser(prev => prev ? ({ ...prev, ...data }) : null);
    setView('nearby');
  };

  // Start Chat Logic
  const handleStartChat = (targetUserId: string) => {
    // Check if chat exists
    const existingSession = sessions.find(s => s.participantId === targetUserId);
    if (existingSession) {
      setActiveSessionId(existingSession.id);
      setView('chat-room');
      return;
    }

    // Check limits
    if (sessions.length >= INITIAL_FREE_CHATS && (user?.credits || 0) < 1) {
      if (confirm("You have reached your free chat limit. Buy credits to continue?")) {
        setView('store');
      }
      return;
    }

    // Deduct credit if over limit
    if (sessions.length >= INITIAL_FREE_CHATS) {
      setUser(prev => prev ? ({ ...prev, credits: prev.credits - 1 }) : null);
    }

    // Create new session
    const newSession: ChatSession = {
      id: `session_${Date.now()}`,
      participantId: targetUserId,
      messages: [],
      lastMessageTimestamp: Date.now(),
      unreadCount: 0
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setView('chat-room');
  };

  // Send Message
  const handleSendMessage = (content: string, type: Message['type']) => {
    if (!activeSessionId) return;
    const currentSessionId = activeSessionId;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: 'current_user',
      content,
      type,
      timestamp: Date.now(),
      status: 'sent'
    };

    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          messages: [...s.messages, newMessage],
          lastMessageTimestamp: Date.now()
        };
      }
      return s;
    }));

    // Simulate Delivery
    setTimeout(() => {
       setSessions(prev => prev.map(s => {
         if (s.id === currentSessionId) {
           return {
             ...s,
             messages: s.messages.map(m => 
               m.id === newMessage.id ? { ...m, status: 'delivered' as const } : m
             )
           };
         }
         return s;
       }));
    }, 1000);

    // Simulate Read
    setTimeout(() => {
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: s.messages.map(m => 
              m.id === newMessage.id ? { ...m, status: 'read' as const } : m
            )
          };
        }
        return s;
      }));
    }, 2500);

    // --- SIMULATE INCOMING REPLY ---
    // Find the participant
    const session = sessions.find(s => s.id === currentSessionId);
    const participantId = session?.participantId;
    const participant = nearbyUsers.find(u => u.id === participantId);

    if (participant) {
       setTimeout(() => {
          const replyText = type === 'text' 
             ? `That's interesting! Tell me more about "${content.substring(0, 10)}..."`
             : "Wow, nice media!";
             
          const replyMsg: Message = {
             id: `msg_reply_${Date.now()}`,
             senderId: participant.id,
             content: replyText,
             type: 'text',
             timestamp: Date.now(),
             status: 'delivered'
          };

          setSessions(prev => prev.map(s => {
             if (s.id === currentSessionId) {
                // Calculate unread count based on whether user is currently viewing this chat
                // Since we are in a setSessions callback, we use the ref for the *current* view state at execution time
                const isViewing = viewRef.current === 'chat-room' && activeSessionIdRef.current === s.id;
                return {
                   ...s,
                   messages: [...s.messages, replyMsg],
                   lastMessageTimestamp: Date.now(),
                   unreadCount: isViewing ? 0 : s.unreadCount + 1
                };
             }
             return s;
          }));

          // Trigger Notification if user is not in this chat room or app is hidden
          const isUserInThisChat = viewRef.current === 'chat-room' && activeSessionIdRef.current === currentSessionId;
          if (!isUserInThisChat || document.visibilityState === 'hidden') {
             sendNotification(`New message from ${participant.username}`, {
                body: replyText,
                icon: participant.avatarUrl
             });
          }
       }, 4000); // Reply 4 seconds after sending
    }
  };

  // Block User
  const handleBlockUser = (userIdToBlock: string) => {
    // Update user profile
    setUser(prev => {
      if(!prev) return null;
      return {
        ...prev,
        blockedUserIds: [...(prev.blockedUserIds || []), userIdToBlock]
      };
    });

    // Remove chat session if exists
    setSessions(prev => prev.filter(s => s.participantId !== userIdToBlock));

    // Redirect to Nearby (or wherever makes sense, maybe chat list)
    setActiveSessionId(null);
    setView('nearby');
  };

  // Unblock User
  const handleUnblockUser = (userIdToUnblock: string) => {
     setUser(prev => {
        if(!prev) return null;
        return {
           ...prev,
           blockedUserIds: prev.blockedUserIds.filter(id => id !== userIdToUnblock)
        };
     });
  };

  // Buy Credits
  const handleBuyCredits = (pkgId: string) => {
    const pkg = CREDIT_PACKAGES.find(p => p.id === pkgId);
    if (pkg) {
      // Simulate payment processing
      setTimeout(() => {
        setUser(prev => prev ? ({ ...prev, credits: prev.credits + pkg.credits }) : null);
        alert(`Successfully purchased ${pkg.credits} credits!`);
        setView('nearby');
      }, 1000);
    }
  };

  // Filtered data
  // Exclude blocked users from nearby list
  const activeNearbyUsers = nearbyUsers.filter(u => !user?.blockedUserIds?.includes(u.id));
  // Exclude blocked users from chat sessions (though we deleted the session, this is a safety check)
  const activeSessions = sessions.filter(s => !user?.blockedUserIds?.includes(s.participantId));
  
  // Get list of blocked user objects for Settings
  const blockedUserObjects = nearbyUsers.filter(u => user?.blockedUserIds?.includes(u.id));

  // Routing / View Switcher
  if (view === 'auth') return <AuthView onLogin={handleLogin} />;
  if (view === 'profile-setup' && user) return <ProfileSetupView user={user} onSave={handleSaveProfile} />;
  
  // Authenticated Layout
  if (view === 'chat-room' && activeSessionId) {
    const session = sessions.find(s => s.id === activeSessionId);
    const otherUser = nearbyUsers.find(u => u.id === session?.participantId);
    if (session && otherUser) {
      return (
         <ChatRoomView 
            session={session} 
            otherUser={otherUser} 
            onBack={() => setView('chat-list')} 
            onSend={handleSendMessage} 
            onBlock={handleBlockUser}
         />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl border-x border-gray-200">
      {/* Main Content Area */}
      <div className="min-h-screen">
        {view === 'nearby' && <NearbyView users={activeNearbyUsers} onChat={handleStartChat} currentUserLocation={location} />}
        {view === 'chat-list' && <ChatListView sessions={activeSessions} users={nearbyUsers} onSelectChat={(id) => { setActiveSessionId(id); setView('chat-room'); }} />}
        {view === 'store' && user && <StoreView credits={user.credits} packages={CREDIT_PACKAGES} onBuy={handleBuyCredits} />}
        {view === 'settings' && user && (
           <SettingsView 
              user={user} 
              blockedUsers={blockedUserObjects}
              onUpdate={(u) => setUser(prev => ({...prev!, ...u}))} 
              onLogout={() => setView('auth')}
              onUnblock={handleUnblockUser}
              onRequestNotification={requestNotificationPermission}
           />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center max-w-md mx-auto z-50">
        <button onClick={() => setView('nearby')} className={`p-2 rounded-xl ${view === 'nearby' ? 'text-brand-600 bg-brand-50' : 'text-gray-400'}`}>
          <MapPin size={24} />
        </button>
        <button onClick={() => setView('chat-list')} className={`p-2 rounded-xl relative ${view === 'chat-list' ? 'text-brand-600 bg-brand-50' : 'text-gray-400'}`}>
          <MessageCircle size={24} />
          {sessions.some(s => s.unreadCount > 0) && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
        </button>
        <button onClick={() => setView('store')} className={`p-2 rounded-xl ${view === 'store' ? 'text-brand-600 bg-brand-50' : 'text-gray-400'}`}>
          <ShoppingBag size={24} />
        </button>
        <button onClick={() => setView('settings')} className={`p-2 rounded-xl ${view === 'settings' ? 'text-brand-600 bg-brand-50' : 'text-gray-400'}`}>
          <SettingsIcon size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;