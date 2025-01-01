import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // For making HTTP requests

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  tickets: any [] = []; // Array to store tickets data

  constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.getTicket(); // Fetch tickets when the component initializes
  // }

  ngOnInit(): void {
    // Make an HTTP request to fetch multiple tickets from the backend
    this.http.get<any[]>('http://localhost:1880/get-tickets')
      .subscribe((data) => {
        console.log('Fetched tickets:', data);
        this.tickets = data;  // Update tickets array with the fetched data
      });
  }

  // Fetch the list of tickets from the backend API
  getTicket(): void {
    this.http.get<any>('http://localhost:1880/get-tickets').subscribe(
      (data) => {
        console.log('Fetched ticket:', data); // Log the full response to inspect
        if (data) {
          this.tickets = data; // Assign the single ticket object to the component
        } else {
          console.error('No ticket found in the response!');
        }
      },
      (error) => {
        console.error('Error fetching ticket', error);
      }
    );
  }
  

  // Update the ticket status (e.g., In Progress, Resolved)
  updateStatus(ticket: any, newStatus: string): void {
    // Send the updated status to the backend API
    this.http
      .put(`http://localhost:1880/update-ticket/${ticket.id}`, {
        status: newStatus
      })
      .subscribe(
        (response) => {
          // On success, update the local tickets array
          ticket.status = newStatus;
        },
        (error) => {
          console.error('Error updating ticket status', error);
        }
      );
  }
}
