package Must; // 各自変更

import java.util.ArrayList;
import java.util.Scanner;

public class BulletinBoard {
    private ArrayList<String> messages;

    public BulletinBoard() {
        messages = new ArrayList<>();
    }

    public void addMessage(String message) {
        messages.add(message);
    }

    public void displayMessages() {
        if (messages.isEmpty()) {
            System.out.println("No messages to display.");
        } else {
            System.out.println("Messages:");
            for (int i = 0; i < messages.size(); i++) {
                System.out.println((i + 1) + ": " + messages.get(i));
            }
        }
    }

    public static void main(String[] args) {
        BulletinBoard board = new BulletinBoard();
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("1. Add a message");
            System.out.println("2. Display messages");
            System.out.println("3. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter your message: ");
                    String message = scanner.nextLine();
                    board.addMessage(message);
                    break;
                case 2:
                    board.displayMessages();
                    break;
                case 3:
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 3);

        scanner.close();
    }
}
