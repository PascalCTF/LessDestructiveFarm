import { Column, Model, Table, Index } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';

export type FlagState = 'QUEUED' | 'SKIPPED' | 'ACCEPTED' | 'REJECTED';

@ObjectType()
@Table
export default class Flag extends Model<Flag> {
  @Field()
  @Column({ primaryKey: true, unique: true })
  flag!: string;

  @Field()
  @Column({ allowNull: false })
  sploit!: string;

  @Field()
  @Column({ allowNull: false })
  team!: string;

  @Field()
  @Column({ allowNull: false })
  @Index({ name: 'Flag_status_timestamp' })
  timestamp!: Date;

  @Field({ nullable: true })
  @Column({ allowNull: true, defaultValue: 'QUEUED' })
  @Index({
    where: { status: 'QUEUED' }
  })
  @Index({ name: 'Flag_status_timestamp' })
  status!: FlagState;

  @Field({ nullable: true })
  @Column({ allowNull: true })
  checksystem_response!: string;
}
