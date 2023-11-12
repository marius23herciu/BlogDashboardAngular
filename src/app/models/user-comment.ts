export interface UserComment {
  id: string; 
  name: string;
  comment: string;
  approved: boolean;
  isReply: boolean;
  replyFor: string; 
  createdAt: Date;
}