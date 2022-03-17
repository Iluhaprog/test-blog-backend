import { Post } from 'src/posts/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'files',
})
export class File {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  ikId: string;

  @ManyToOne(() => Post, (post: Post) => post.files, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post;
}
