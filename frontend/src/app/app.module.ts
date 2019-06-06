import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertsModule } from 'angular-alert-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RespComponent } from './resp/resp.component';
import { QuesComponent } from './ques/ques.component';
import { QuesPageComponent } from './ques-page/ques-page.component';
import { RespPageComponent } from './resp-page/resp-page.component';

import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTES_PROVIDER } from './app.routes';

import { WebSocketService } from './Services/web-socket.service';
import { ChatService } from './Services/chat.service';
import { RespSocketService } from './Services/resp-socket.service';
import { RespService } from './Services/resp.service';
import { QuesServiceService } from './Services/quesService/ques-service.service';
import { RespServiceService } from './Services/respService/resp-service.service';
import { ContainerComponent } from './container/container.component';
import { FinalComponent } from './final/final.component';

@NgModule({
  declarations: [
    AppComponent,
    QuesComponent,
    RespComponent,
    QuesPageComponent,
    RespPageComponent,
    ContainerComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    APP_ROUTES_PROVIDER,
    FormsModule,
    AlertsModule.forRoot()
  ],
  providers: [
    WebSocketService,
    ChatService,
    RespService,
    RespSocketService,
    RespComponent,
    QuesServiceService,
    RespServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
