import { Controller, Get, Post, Body, Render, Res, Param, Query } from '@nestjs/common';
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
  async findAll(@Query('search') search: string) {
    const products = await this.productService.findAll(search);
    const categories = await this.categoryService.findAll();
    return {
      title: 'Products',
      products,
      categories,
      search
    };
  }

  @Post('create')
  async create(@Body() body: any, @Res() res) {
    await this.productService.create(body);
    return res.redirect('/product');
  }

  @Get(':id/edit')
  @Render('product/edit')
  async edit(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);
    const categories = await this.categoryService.findAll();
    return {
      title: 'Edit Product',
      product,
      categories,
    };
  }

  @Post(':id/update')
  async update(@Param('id') id: string, @Body() body: any, @Res() res) {
    await this.productService.update(+id, body);
    return res.redirect('/product');
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Res() res) {
    await this.productService.remove(+id);
    return res.redirect('/product');
  }
}
