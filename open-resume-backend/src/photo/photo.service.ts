import { Injectable, NotFoundException } from '@nestjs/common';
import { PhotoDto } from './dto/create-photo.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Photo } from "./entities/photo.entity";
import { Resume } from 'src/resume/entities/resume.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadedFileService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
  ) {}

  async createPhoto(photoDto: PhotoDto, fileBuffer: Buffer): Promise<Photo> {
    const resume = await this.resumeRepository.findOne({ where: { id: photoDto.resumeid } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    // Créer une nouvelle instance de Photo avec les informations reçues
    const photo = this.photoRepository.create(photoDto);
    photo.resume = resume;

    try {
      // Sauvegarder les informations de la photo dans la base de données
      const savedPhoto = await this.photoRepository.save(photo);

      // Enregistrer le fichier sur le disque avec un nom spécifié
      const folderPath = 'C:\\Users\\XPS\\Desktop\\Open-resume-app\\open-resume-backend\\assets\\photo';
      const filePath = path.join(folderPath, photoDto.name);
      await this.saveFile(fileBuffer, filePath);

      // Lire le contenu du fichier et le retourner
      const fileContent = await this.readFile(filePath);

      // Mettre à jour l'URL du fichier dans l'entité Photo
      savedPhoto.fileUrl = filePath;
      await this.photoRepository.save(savedPhoto);

      return savedPhoto;
    } catch (error) {
      // Gérer les erreurs
      throw new Error(`Failed to create photo: ${error.message}`);
    }
  }

  private async saveFile(fileBuffer: Buffer, filePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const fileStream = fs.createWriteStream(filePath);
      fileStream.write(fileBuffer);
      fileStream.end();
      fileStream.on('error', (error) => reject(error));
      fileStream.on('finish', () => resolve());
    });
  }

  async readFile(filePath: string): Promise<Buffer> {
    try {
      // Lire le contenu du fichier de manière asynchrone
      const fileContent = await fs.promises.readFile(filePath);
      return fileContent; // Retourner le contenu du fichier sous forme de Buffer
    } catch (error) {
      // Gérer les erreurs de lecture de fichier
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }
}
