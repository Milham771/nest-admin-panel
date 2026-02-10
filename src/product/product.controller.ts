import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @Render('product/index')
  async findAll() {
    const products = await this.productService.findAll();
    const categories = await this.categoryService.findAll();
    return {
      title: 'Products',
      products,
      categories,
    };
  }

  @Post('create')
  async create(@Body() body: any, @Res() res) {
    await this.productService.create(body);
    return res.redirect('/product');
  }
}