import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent {
  ticket = {
    name: '',
    email: '',
    description: ''
  };

  responseMessage: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit(form: any) {
    if (form.valid) {
      // Replace the URL with your Node-RED backend endpoint
      const backendUrl = 'http://localhost:1880/submit-ticket';

      this.http.post(backendUrl, this.ticket).subscribe({
        next: (response: any) => {
          this.responseMessage = 'Your ticket has been submitted successfully!';
          form.reset();
        },
        error: (err) => {
          console.error('Error submitting ticket:', err);
          this.responseMessage = 'An error occurred. Please try again later.';
        }
      });
    }
  }
}
