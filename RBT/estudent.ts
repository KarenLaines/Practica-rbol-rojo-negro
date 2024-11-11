export class Estudent{
    private ID:number;
    private name:string;
    private age:number;
    private GPA: number;


    constructor(ID: number, name: string, age: number, GPA: number) {
        this.ID = ID;
        this.name = name
        this.age = age
        this.GPA = GPA

        
    }
    public showInformation(): string{
        return this.ID+ ' ' + this.name + ' ' + this.age + ' ' + this.GPA
    }

    public getID(): number {
        return this.ID;
    }

    
    public getName(): string {
        return this.name;
    }

    
    public getAge(): number {
        return this.age;
    }

    

    public getGPA(): number {
        return this.GPA;
    }



}