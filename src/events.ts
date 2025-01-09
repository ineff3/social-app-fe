export const chatEvents = {
  MESSAGE: {
    SEND: 'message:send',
    NEW: 'message:new',
    READ: 'message:read',
    READ_ALL: 'message:read:all',
  },
  STATUS: {
    ONLINE: 'status:online',
    OFFLINE: 'status:offline',
  },
  TYPING: {
    START: 'typing:start',
    STOP: 'typing:stop',
  },
  NOTIFICATION: {
    NEW_MESSAGE: 'notification:message:new',
  },
  ROOM: {
    ENTER: 'room:enter',
    LEAVE: 'room:leave',
  },
}
