package experiment.Must.Must.Tetris;

import javax.swing.JFrame;

public class Tetris extends JFrame {

    public Tetris() {
        initUI();
    }

    private void initUI() {
        Board board = new Board();
        add(board);
        setTitle("Tetris");
        setSize(300, 600);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
    }

    public static void main(String[] args) {
        Tetris game = new Tetris();
        game.setVisible(true);
    }
}