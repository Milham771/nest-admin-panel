import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  @Render('category/index')
  async findAll(@Query('search') search: string) {
    const categories = await this.categoryService.findAll(search);
    return {
      title: 'Categories',
      categories,
      search
    };
  }

  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
    await this.categoryService.create(createCategoryDto);
    return res.redirect('/category');
  }

  @Get(':id')
  @Render('category/detail')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);

    if (!category) {
      return {
        title: 'Category Not Found',
        category: null
      };
    }
    
    return {
      title: 'Category Detail',
      category
    };
  }

  @Get(':id/edit')
  @Render('category/edit')
  async edit(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);
    return {
      title: 'Edit Category',
      category
    };
  }

  @Post(':id/update')
  async update(@Param('id') id: string, @Body() body: any, @Res() res) {
    await this.categoryService.update(+id, body);
    return res.redirect('/category');
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Res() res) {
    await this.categoryService.remove(+id);
    return res.redirect('/category');
  }
}
