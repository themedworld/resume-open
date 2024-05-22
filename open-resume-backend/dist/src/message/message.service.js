"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const user_entity_1 = require("../users/entities/user.entity");
let MessageService = class MessageService {
    constructor(messageRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    async create(createMessageDto) {
        const sender = await this.userRepository.findOne({ where: { id: createMessageDto.sender } });
        if (!sender) {
            throw new common_1.NotFoundException('Sender not found');
        }
        const receiver = await this.userRepository.findOne({ where: { id: createMessageDto.receiver } });
        if (!receiver) {
            throw new common_1.NotFoundException('Receiver not found');
        }
        const message = this.messageRepository.create({
            Message: createMessageDto.Message,
            sender,
            receiver,
        });
        return this.messageRepository.save(message);
    }
    findAll() {
        return this.messageRepository.find({ relations: ['sender', 'receiver'] });
    }
    async findBySenderAndReceiver(senderId, receiverId) {
        const messages = await this.messageRepository.find({
            where: { sender: { id: senderId }, receiver: { id: receiverId } },
        });
        const enrichedMessages = messages.map(message => ({
            senderId,
            receiverId,
            message,
        }));
        return {
            messages: enrichedMessages,
        };
    }
    async findContact(senderId) {
        const query = this.messageRepository
            .createQueryBuilder('message')
            .distinctOn(['message.receiver'])
            .innerJoinAndSelect('message.receiver', 'receiver')
            .where('message.senderId = :senderId', { senderId })
            .orderBy('message.receiverId')
            .getMany();
        const messages = await query;
        return messages.map(message => message.receiver);
    }
    async findContactDem(receiverId) {
        const messages = await this.messageRepository
            .createQueryBuilder('message')
            .distinctOn(['message.senderId'])
            .innerJoinAndSelect('message.sender', 'sender')
            .where('message.receiverId = :receiverId', { receiverId })
            .orderBy('message.senderId')
            .addOrderBy('message.createdAt', 'DESC')
            .getMany();
        return messages.map(message => message.sender);
    }
    async remove(id) {
        await this.messageRepository.delete(id);
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MessageService);
//# sourceMappingURL=message.service.js.map