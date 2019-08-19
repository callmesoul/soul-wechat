import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminResolver } from './admins.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './admins.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Admin', schema: AdminSchema}])],
  providers: [AdminsService, AdminResolver],
  exports:[AdminsService]
})
export class AdminModule {}
