import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Permission} from "../../permission/entities/permission.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', { length: 40 } )
    name: string;
    
    @ManyToMany( () => Permission, { cascade: true })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    permissions: Permission[]
}