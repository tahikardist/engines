import {Module} from '@nestjs/common';
import {EnginesModule} from './engines/engines.module';

@Module({
    imports: [EnginesModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
