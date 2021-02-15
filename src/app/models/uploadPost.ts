export class UploadPost {
  text: string;
  photo: FormData;
  creatorId: number;
  constructor(text: string, photo: FormData, creatorId: number) {
    (this.text = text), (this.photo = photo), (this.creatorId = creatorId);
  }
}
