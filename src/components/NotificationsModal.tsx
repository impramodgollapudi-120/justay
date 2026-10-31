import React from 'react';
import { X, Bell, Tag, CheckCircle2, Compass, CheckCheck, Trash2 } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string | number) => void;
  onClearNotifications: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  onClearNotifications,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIconAndColor = (type: AppNotification['type']) => {
    switch (type) {
      case 'offer':
        return { icon: Tag, color: 'bg-red-50 text-red-600 border border-red-200' };
      case 'booking':
        return { icon: CheckCircle2, color: 'bg-red-100 text-red-900 border border-red-300/40' };
      case 'trending':
      default:
        return { icon: Compass, color: 'bg-red-50 text-red-900 border border-red-200/50' };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white text-red-950 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-red-900/15 animate-scaleUp flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-red-900/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-600/10 text-red-600">
              <Bell className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-red-950">
                Notifications
              </h3>
              <p className="text-[11px] text-red-900/60 font-medium">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                  : 'All caught up!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                id="btn-mark-all-read"
                onClick={onMarkAllAsRead}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-red-950 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="mt-3 space-y-2.5 overflow-y-auto pr-1 flex-1 no-scrollbar">
          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-stone-600">No notifications yet</p>
              <p className="text-[11px] text-stone-400 mt-0.5">We'll alert you about bookings, offers and updates</p>
            </div>
          ) : (
            notifications.map((n) => {
              const { icon: Icon, color } = getIconAndColor(n.type);
              return (
                <div
                  key={n.id}
                  onClick={() => onMarkAsRead(n.id)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer group ${
                    n.read
                      ? 'bg-stone-50/70 border-stone-200/80 opacity-75'
                      : 'bg-red-50/40 border-red-200 hover:border-red-400 shadow-2xs'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className={`text-xs font-extrabold truncate ${n.read ? 'text-stone-700' : 'text-red-950 font-black'}`}>
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-stone-400 shrink-0 font-medium">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5 leading-snug line-clamp-2">
                      {n.desc}
                    </p>
                  </div>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-1.5" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        {notifications.length > 0 && (
          <div className="pt-3 mt-2 border-t border-red-900/10 flex items-center justify-between shrink-0">
            <button
              onClick={onClearNotifications}
              className="text-[11px] text-stone-400 hover:text-red-600 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={onClose}
              className="w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
