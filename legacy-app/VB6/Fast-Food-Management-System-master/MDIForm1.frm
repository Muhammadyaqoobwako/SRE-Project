VERSION 5.00
Begin VB.MDIForm MDIForm1 
   BackColor       =   &H8000000C&
   Caption         =   "MDIForm1"
   ClientHeight    =   3015
   ClientLeft      =   225
   ClientTop       =   855
   ClientWidth     =   4560
   LinkTopic       =   "MDIForm1"
   StartUpPosition =   3  'Windows Default
   WindowState     =   2  'Maximized
   Begin VB.PictureBox Picture1 
      Align           =   1  'Align Top
      Height          =   10695
      Left            =   0
      Picture         =   "MDIForm1.frx":0000
      ScaleHeight     =   10635
      ScaleWidth      =   4500
      TabIndex        =   0
      Top             =   0
      Width           =   4560
      Begin VB.PictureBox Picture4 
         Height          =   1215
         Left            =   6600
         Picture         =   "MDIForm1.frx":6A286
         ScaleHeight     =   1155
         ScaleWidth      =   2355
         TabIndex        =   3
         Top             =   4080
         Width           =   2415
      End
      Begin VB.PictureBox Picture3 
         Height          =   3135
         Left            =   11880
         Picture         =   "MDIForm1.frx":6B0D6
         ScaleHeight     =   3075
         ScaleWidth      =   8235
         TabIndex        =   2
         Top             =   3960
         Width           =   8295
      End
      Begin VB.PictureBox Picture2 
         Height          =   3975
         Left            =   13200
         Picture         =   "MDIForm1.frx":821BD
         ScaleHeight     =   3915
         ScaleWidth      =   7035
         TabIndex        =   1
         Top             =   0
         Width           =   7095
      End
   End
   Begin VB.Menu MENU 
      Caption         =   "MENU"
      Begin VB.Menu BREVERAGES 
         Caption         =   "BREVERAGES"
         Begin VB.Menu Sprite 
            Caption         =   "Sprite"
         End
         Begin VB.Menu Coke 
            Caption         =   "Ice cream"
         End
      End
      Begin VB.Menu SNACKS 
         Caption         =   "SNACKS"
         Begin VB.Menu IceCream 
            Caption         =   "IceCream"
         End
         Begin VB.Menu Pizza 
            Caption         =   "Pizza"
         End
      End
      Begin VB.Menu FOOD 
         Caption         =   "FOOD"
         Begin VB.Menu Chips 
            Caption         =   "Chips"
         End
         Begin VB.Menu Bargers 
            Caption         =   "Bargers"
         End
      End
   End
   Begin VB.Menu REPORTS 
      Caption         =   "REPORTS"
      Begin VB.Menu CokeReport 
         Caption         =   "Ice cream Report"
      End
      Begin VB.Menu SpriteReport 
         Caption         =   "Sprite Report"
      End
      Begin VB.Menu BurgerReport 
         Caption         =   "BurgerReport"
      End
   End
   Begin VB.Menu EXIT 
      Caption         =   "EXIT"
   End
End
Attribute VB_Name = "MDIForm1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub Bargers_Click()
Form3.Show
Unload Me

End Sub

Private Sub BurgerReport_Click()
'DataReport1.Show
'DataReport1.Show
DataReport4.Show
End Sub

Private Sub Chips_Click()
Form6.Show
Unload Me

End Sub

Private Sub Coke_Click()
Form2.Show
Unload Me

End Sub

Private Sub Smokies_Click()

End Sub

Private Sub CokeReport_Click()
DataReport3.Show
End Sub

Private Sub EXIT_Click()
Unload Me

End Sub

Private Sub IceCream_Click()
Form5.Show
Unload Me

End Sub

Private Sub Pizza_Click()
Form4.Show
Unload Me

End Sub

Private Sub Sprite_Click()
Form1.Show
Unload Me

End Sub

Private Sub SpriteReport_Click()
DataReport2.Show
End Sub
