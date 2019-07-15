import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn() id: ObjectID;
  @Column() username: string;
  @Column() password: string;
}