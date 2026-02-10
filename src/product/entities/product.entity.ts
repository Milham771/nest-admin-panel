import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("decimal")
    price: number;

    @Column()
    stock: number;

    @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
    category: Category; 
    
}
