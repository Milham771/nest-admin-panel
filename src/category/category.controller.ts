import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  @Render('category/index')
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      title: 'Categories',
      categories
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
}
