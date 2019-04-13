export class Item {
    public item_id: number;
    public item_name: string;
    public finished_by: string;
    public created_by: string;
    public created_at: string;
    public finished_at: string;
    public finished: Boolean;
    constructor( id:number, name: string,  finishedBy: string, createdBy: string, createdAt: string, finishedAt: string, finished: Boolean){
                    this.item_id = id;
                    this.item_name = name;
                    this.finished_by = finishedBy;
                    this.created_by = createdBy;
                    this.created_at = createdAt;
                    this.finished_at = finishedAt;
                    this.finished = finished;
                }
    }

/*     CREATE TABLE `cleaningplandb`.`shopping_list` (
        `item_id` INT NOT NULL AUTO_INCREMENT,
        `item_name` VARCHAR(500) NOT NULL,
        `finished_by` VARCHAR(150) NULL,
        `created_by` VARCHAR(150) NOT NULL,
        `created_at` DATETIME NOT NULL,
        `finished_at` DATETIME NULL,
        `finished` TINYINT NOT NULL,
        PRIMARY KEY (`item_id`)); */