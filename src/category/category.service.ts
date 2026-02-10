import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();

    return categories;
  }


  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { products: true },
    });

    return category;
  }


  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.categoryRepository.delete(id);
    return { deleted: true };
  }
}
