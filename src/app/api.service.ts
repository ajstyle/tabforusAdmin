import { Injectable   } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import 'rxjs/add/operator/map';
@Injectable()
export class ApiService {
apiUrl = 'https://www.googleapis.com/youtube/v3' ;
  apiKey = 'AIzaSyAFjOpYmBnaO0kB-i5n6Fbc_u8kQhnK_Os' ;

  constructor(public http :HttpClient ) { }


   getChannel() {
     return this.http.get('https://hidden-river-35112.herokuapp.com/api/Channel');
   }

   saveChannel(data) {
     return this.http.post('https://hidden-river-35112.herokuapp.com/api/Channel' , data );
   }

   update(id,data) {
     return this.http.put(`https://hidden-river-35112.herokuapp.com/api/Channel/${id}` , data) ;
   }
   delete(id) {
     return this.http.delete(`https://hidden-river-35112.herokuapp.com/api/Channel/${id}`) ;
   }
}


