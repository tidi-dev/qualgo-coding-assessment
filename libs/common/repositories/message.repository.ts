import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class MessageRepository extends BaseRepository {}
