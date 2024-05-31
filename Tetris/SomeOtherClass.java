package experiment.Must.Must.Tetris;

public class SomeOtherClass {
    private Board board;

    public SomeOtherClass() {
        board = new Board();
    }

    public void someMethod() {
        // board 変数を使用するロジック
        Shape.Tetrominoes shape = board.shapeAt(0, 0);
    }
}
