VERSION 5.00
Begin VB.Form Form1 
   Caption         =   "Sprite"
   ClientHeight    =   9270
   ClientLeft      =   225
   ClientTop       =   555
   ClientWidth     =   11280
   LinkTopic       =   "Form1"
   ScaleHeight     =   9270
   ScaleWidth      =   11280
   StartUpPosition =   3  'Windows Default
   WindowState     =   2  'Maximized
   Begin VB.Frame Frame1 
      BackColor       =   &H00004000&
      Height          =   10935
      Left            =   600
      TabIndex        =   0
      Top             =   720
      Width           =   20295
      Begin VB.PictureBox Picture2 
         Height          =   2295
         Left            =   4920
         Picture         =   "Form1.frx":0000
         ScaleHeight     =   2235
         ScaleWidth      =   4155
         TabIndex        =   14
         Top             =   240
         Width           =   4215
      End
      Begin VB.Frame Frame3 
         BackColor       =   &H00004000&
         Height          =   1095
         Left            =   120
         TabIndex        =   9
         Top             =   6480
         Width           =   8535
         Begin VB.CommandButton cmdExit 
            Caption         =   "Exit"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   6960
            TabIndex        =   13
            Top             =   240
            Width           =   1335
         End
         Begin VB.CommandButton cmdUpdate 
            Caption         =   "Update Menu"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   5160
            TabIndex        =   12
            Top             =   240
            Width           =   1575
         End
         Begin VB.CommandButton cmdOrder 
            Caption         =   "Order"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   3120
            TabIndex        =   11
            Top             =   240
            Width           =   1815
         End
         Begin VB.CommandButton cmdAddNewOrder 
            Caption         =   "Add New Order"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   0
            TabIndex        =   10
            Top             =   240
            Width           =   2895
         End
      End
      Begin VB.Frame Frame2 
         BackColor       =   &H00004000&
         Caption         =   "Sprite"
         BeginProperty Font 
            Name            =   "Comic Sans MS"
            Size            =   11.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         ForeColor       =   &H8000000E&
         Height          =   3135
         Left            =   120
         TabIndex        =   2
         Top             =   2640
         Width           =   9015
         Begin VB.ComboBox spritePrices 
            Height          =   315
            ItemData        =   "Form1.frx":70EF
            Left            =   2880
            List            =   "Form1.frx":710B
            TabIndex        =   16
            Top             =   2280
            Width           =   3615
         End
         Begin VB.ComboBox cboDrinkName 
            DataField       =   "DrinkName"
            DataMember      =   "Sprite"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form1.frx":7147
            Left            =   2880
            List            =   "Form1.frx":715D
            TabIndex        =   15
            Top             =   360
            Width           =   3615
         End
         Begin VB.ComboBox Combo1 
            DataField       =   "Quantity"
            DataMember      =   "Sprite"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form1.frx":71C6
            Left            =   2880
            List            =   "Form1.frx":71E8
            TabIndex        =   8
            Top             =   1560
            Width           =   3615
         End
         Begin VB.ComboBox cboType 
            DataField       =   "Type"
            DataMember      =   "Sprite"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form1.frx":7233
            Left            =   2880
            List            =   "Form1.frx":723D
            TabIndex        =   7
            Top             =   960
            Width           =   3615
         End
         Begin VB.Label Label4 
            BackColor       =   &H00004000&
            Caption         =   "Type"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   12
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   120
            TabIndex        =   6
            Top             =   960
            Width           =   1215
         End
         Begin VB.Label Label3 
            BackColor       =   &H00004000&
            Caption         =   "Quantity in MLs"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   12
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   120
            TabIndex        =   5
            Top             =   1560
            Width           =   2055
         End
         Begin VB.Label Label2 
            BackColor       =   &H00004000&
            Caption         =   "Price Tag"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   12
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   120
            TabIndex        =   4
            Top             =   2280
            Width           =   1335
         End
         Begin VB.Label Label1 
            BackColor       =   &H00004000&
            Caption         =   "Drinks Name"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   12
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   120
            TabIndex        =   3
            Top             =   480
            Width           =   2415
         End
      End
      Begin VB.PictureBox Picture1 
         Height          =   2295
         Left            =   240
         Picture         =   "Form1.frx":7252
         ScaleHeight     =   2235
         ScaleWidth      =   4635
         TabIndex        =   1
         Top             =   240
         Width           =   4695
      End
   End
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub cmdAddNewOrder_Click()
DataEnvironment1.rsSprite.AddNew
End Sub

Private Sub cmdExit_Click()
MDIForm1.Show
Me.Hide

End Sub

Private Sub cmdOrder_Click()
If Trim(cboDrinkName.List(cboDrinkName.ListIndex)) = "Sprit Duo" Then
MsgBox "Hello " & (cboDrinkName.List(cboDrinkName.ListIndex))
'MsgBox " You have selected Sprite Duo"
Else
MsgBox " Oops"
End If
DataEnvironment1.rsSprite.AddNew
MsgBox "The Order has been made"
End Sub

Private Sub cmdUpdate_Click()
DataEnvironment1.rsSprite.Update
MsgBox "The Drinks Menu has been Updated"
End Sub

Private Sub Combo1_Click()
If Trim(Combo1.List(Combo1.ListIndex)) = "100ml" Then

txtPriceTag.Text = 250
ElseIf Trim(Combo1.List(Combo1.ListIndex)) = "200ml" Then
txtPriceTag.Text = 300
ElseIf Trim(Combo1.List(Combo1.ListIndex)) = "300ml" Then
txtPriceTag.Text = 320
ElseIf Trim(Combo1.List(Combo1.ListIndex)) = "400ml" Then
txtPriceTag.Text = 350
ElseIf Trim(Combo1.List(Combo1.ListIndex)) = "500ml" Then
'txtPriceTag.Text = 380
ElseIf Trim(Combo1.List(Combo1.ListIndex)) = "600ml" Then
txtPriceTag.Text = 400
ElseIf Trim(Combo1.List(Combo1.ListIndex)) = "700ml" Then
txtPriceTag.Text = 450
ElseIf Trim(Combo1.List(Combo1.ListIndex)) = "800ml" Then
txtPriceTag.Text = 470
ElseIf Trim(Combo1.List(Combo1.ListIndex)) = "900ml" Then
txtPriceTag.Text = 500
ElseIf Trim(Combo1.List(Combo1.ListIndex)) = "1000ml" Then
txtPriceTag.Text = 550
Else
MsgBox "Problem with pricing"
End If
End Sub

Private Sub txtPriceTag_Change()

End Sub

