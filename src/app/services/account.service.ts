import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userDetailList = [];
  userData;
  imageSubject = new Subject<boolean>();
  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) {}

  getId() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    return decoded.userid;
  }

  getUsers() {
    return this.http.get('http://localhost:8080/api/accounts');
  }

  getData() {
    return this.http.get('http://localhost:8080/api/accounts/' + this.getId());
  }

  getUserData() {
    return new Promise((resolve) => {
      return this.http
        .get('http://localhost:8080/api/accounts/' + this.getId())
        .subscribe((data) => {
          this.userData = data;
          resolve(this.userData);
        });
    });
  }

  //  getBasicAccountDetails(id) {
  //   const userDetail = this.userDetailList.find((userD) => {
  //     userD.idAccount === id;
  //   });
  //   if (userDetail) {
  //     return userDetail;
  //   } else {
  //     return this.http
  //       .get('http://localhost:8080/api/accounts/details/' + id)
  //       .subscribe((data) => {
  //         this.userDetailList.push(data[0]);
  //       });
  //     }
  //   }
  getBasicAccountDetails(id) {
    return this.http.get('http://localhost:8080/api/accounts/details/' + id);
  }

  getAccountById(accountId) {
    return this.http.get('http://localhost:8080/api/accounts/' + accountId);
  }

  updateAccount(data) {
    data.idAccount = this.getId();
    console.log(data);
    return this.http.put('http://localhost:8080/api/accounts/', data);
  }

  deleteAccount() {
    console.log(this.getId());
    return this.http.delete(
      'http://localhost:8080/api/accounts/' + this.getId()
    );
  }
}
// createImageFromBlob(image: Blob) {
//   return new Promise((resolve) => {
//     let reader = new FileReader();
//     reader.addEventListener(
//       'load',
//       () => {
//         const image = this._sanitizer.bypassSecurityTrustResourceUrl(
//           reader.result.toString()
//         );
//         resolve(image);
//       },
//       false
//     );

//     if (image) {
//       reader.readAsDataURL(image);
//     }
//   });
// }

// getUserImageAndData() {
//   return new Promise<any>((resolve) => {
//     this.getData().subscribe((data: any) => {
//       this.http
//         .get('http://localhost:8080/files/' + data.profilePhoto, {
//           responseType: 'blob',
//         })
//         .subscribe(async (blob) => {
//           const image = await this.createImageFromBlob(blob);
//           const object = {
//             userData: data,
//             image,
//           };
//           resolve(object);
//           // console.log(this.theAccountObject.profilePhoto);
//         });
//     });
//   });
// }

// createImageFromBlob(image: Blob) {
//   let reader = new FileReader();
//   reader.addEventListener(
//     'load',
//     () => {
//       this.userImage = this._sanitizer.bypassSecurityTrustResourceUrl(
//         reader.result.toString()
//       );
//     },
//     false
//   );

//   if (image) {
//     reader.readAsDataURL(image);
//   }
// }

// getUserImage(dataObject, myImage) {
//   this.getData().subscribe((data) => {
//     dataObject = data;
//     this.http
//       .get('http://localhost:8080/files/' + dataObject?.profilePhoto, {
//         responseType: 'blob',
//       })
//       .subscribe((data) => {
//         data = myImage;
//         let reader = new FileReader();
//         reader.addEventListener(
//           'load',
//           () => {
//             myImage = this._sanitizer.bypassSecurityTrustResourceUrl(
//               reader.result.toString()
//             );
//           },
//           false
//         );

//         // if (image) {
//         //   reader.readAsDataURL(image);
//         // }
//       });
//   });
//   return myImage;
// }
