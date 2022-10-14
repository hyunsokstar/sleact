import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


declare const module: any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`listening on port  ${port}`);


  //  ========== swager 설정 start ==============
  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact api 문서 for development')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    //  ========== swager 설정 end ==============


  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
