import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(search?: string) {
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (search) {
      query.where('product.name LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async create(productData: any) {
    const { categoryId, ...rest } = productData;
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new Error('Category not found');
    }
    const product = this.productRepository.create({
      ...rest,
      category: category,
    });
    return await this.productRepository.save(product);
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async update(id: number, productData: any) {
    const { categoryId, ...rest } = productData;
    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: categoryId });
      if (category) {
        rest.category = category;
      }
    }
    await this.productRepository.update(id, rest);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
    return { deleted: true };
  }
}