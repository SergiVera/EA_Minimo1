export class User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  gender: string;
  birthday: Date;
  phone: Number;
  location: string;
  picture: string;
  password: string;
  interests: string[];
  rank: Number;
  money: Number;
  points: Number;
  aboutme: string;

  constructor(_id='', name = '', surname = '', username = '', email = '', gender = '', birthday = new Date(), phone = 0, location = '', picture = '', password = '', interests = [''], rank = 0, money = 0, points = 0, aboutme = ''){
    this._id = _id;
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.gender = gender;
    this.birthday = birthday;
    this.phone = phone;
    this.location = location;
    this.picture = picture;
    this.password = password;
    this.interests = interests;
    this.rank = rank;
    this.money = money;
    this.points = points;
    this.aboutme = aboutme;
  }
}
