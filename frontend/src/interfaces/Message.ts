export interface Message {
  id: string;
  appliesId: string;
  userMessage: string;
  answerAi: string;
  sourceAi: string;
  modelAi: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

