import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-elements-example-dialog',
    template: `
        <h1 mat-dialog-title>O'chirish</h1>
        <div mat-dialog-content>Siz rostdan ham o'chirmoqchimisiz?</div>
        <div mat-dialog-actions>
        <button color="primary" mat-raised-button (click)="tasdiqlash()">Tasdiqlash</button>
        <button color="accent" mat-raised-button mat-dialog-close>Bekor qilish</button>
        </div>
    `,
})
export class DeleteDialog { 

    constructor(public dialogRef: MatDialogRef<DeleteDialog> ){}

    tasdiqlash(){
        this.dialogRef.close(true);
    }

}