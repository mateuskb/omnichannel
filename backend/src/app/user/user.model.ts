import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Address } from '../address/address.model';
  
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @OneToOne(() => Address, { cascade: true })
    @JoinColumn()
    address: Address;
  }