import {Module} from '@nestjs/common';
import {EnginesController} from './engines.controller';
import {EnginesService} from './engines.service';
import {PrismaService} from "../prisma.service";

@Module({
    controllers: [EnginesController],
    providers: [EnginesService, PrismaService],
    exports: [EnginesService]
})
export class EnginesModule {
}
