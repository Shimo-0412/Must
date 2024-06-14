package experiment.Must.Must;

import javax.swing.*;
import java.awt.*;
import java.awt.datatransfer.*;
import java.awt.dnd.*;
import java.awt.event.*;
import java.util.ArrayList;

public class EnhancedImage extends JFrame {
    private JPanel body;
    private JButton addButton;
    private ArrayList<JPanel> panels = new ArrayList<>();

    public EnhancedImage() {
        setTitle("Enhanced Image");
        setSize(600, 800);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        addButton = new JButton("+");
        addButton.setFont(new Font("Arial", Font.PLAIN, 40));
        addButton.setBackground(new Color(40, 167, 69));
        addButton.setForeground(Color.WHITE);
        addButton.setFocusPainted(false);
        addButton.setBorderPainted(false);
        addButton.setOpaque(true);
        addButton.setPreferredSize(new Dimension(60, 60));
        addButton.setMargin(new Insets(0, 0, 0, 0));
        addButton.setContentAreaFilled(false);
        addButton.setBorder(BorderFactory.createEmptyBorder());
        addButton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));

        addButton.addActionListener(e -> addNewPanel());

        body = new JPanel();
        body.setLayout(new BoxLayout(body, BoxLayout.Y_AXIS));
        body.setBackground(new Color(248, 249, 250));

        JScrollPane scrollPane = new JScrollPane(body);
        scrollPane.setBorder(BorderFactory.createEmptyBorder());

        add(addButton, BorderLayout.NORTH);
        add(scrollPane, BorderLayout.CENTER);
    }

    private void addNewPanel() {
        JPanel parent = new JPanel();
        parent.setLayout(new BorderLayout());
        parent.setBorder(BorderFactory.createLineBorder(Color.BLACK));
        parent.setMaximumSize(new Dimension(Integer.MAX_VALUE, 150));
        parent.setBackground(Color.WHITE);

        JTextArea textArea = new JTextArea();
        textArea.setLineWrap(true);
        textArea.setWrapStyleWord(true);
        textArea.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        JButton deleteBtn = new JButton("x");
        deleteBtn.setForeground(Color.WHITE);
        deleteBtn.setBackground(Color.RED);
        deleteBtn.setBorderPainted(false);
        deleteBtn.setFocusPainted(false);
        deleteBtn.setOpaque(true);
        deleteBtn.setPreferredSize(new Dimension(20, 20));
        deleteBtn.setMargin(new Insets(0, 0, 0, 0));
        deleteBtn.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));

        deleteBtn.addActionListener(e -> body.remove(parent));

        parent.add(textArea, BorderLayout.CENTER);
        parent.add(deleteBtn, BorderLayout.EAST);

        panels.add(parent);
        body.add(parent);
        body.revalidate();
        body.repaint();

        new DropTarget(parent, new DropTargetAdapter() {
            public void drop(DropTargetDropEvent dtde) {
                try {
                    dtde.acceptDrop(DnDConstants.ACTION_MOVE);
                    Transferable transferable = dtde.getTransferable();
                    Object data = transferable.getTransferData(DataFlavor.stringFlavor);
                    if (data instanceof String) {
                        Component component = (Component) dtde.getDropTargetContext().getComponent();
                        body.remove(component);
                        body.add(component, Integer.parseInt((String) data));
                        body.revalidate();
                        body.repaint();
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        parent.setTransferHandler(new TransferHandler("text"));
        parent.addMouseListener(new MouseAdapter() {
            public void mousePressed(MouseEvent e) {
                JComponent c = (JComponent) e.getSource();
                TransferHandler handler = c.getTransferHandler();
                handler.exportAsDrag(c, e, TransferHandler.MOVE);
            }
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            EnhancedImage frame = new EnhancedImage();
            frame.setVisible(true);
        });
    }
}