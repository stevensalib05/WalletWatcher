import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-balances',
  imports: [FormsModule],
  templateUrl: './balances.html',
  styleUrl: './balances.css',
})
export class Balances {
  accountName = '';
  balance = '';
  borrowingAccountName = '';
  borrowingAccountOutstanding = '';

  onAddAccount() {
    
  }

  onAddBorrowing() {
    
  }
}
