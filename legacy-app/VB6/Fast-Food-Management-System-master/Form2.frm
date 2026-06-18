VERSION 5.00
Begin VB.Form Form2 
   Caption         =   "Form2"
   ClientHeight    =   9375
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   12765
   LinkTopic       =   "Form2"
   ScaleHeight     =   9375
   ScaleWidth      =   12765
   StartUpPosition =   3  'Windows Default
   WindowState     =   2  'Maximized
   Begin VB.Frame Frame1 
      BackColor       =   &H000000C0&
      Height          =   12480
      Left            =   -480
      TabIndex        =   0
      Top             =   0
      Width           =   20295
      Begin VB.Frame Frame3 
         BackColor       =   &H000000C0&
         Height          =   1695
         Left            =   600
         TabIndex        =   11
         Top             =   6720
         Width           =   9975
         Begin VB.CommandButton Command1 
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
            Left            =   7560
            TabIndex        =   16
            Top             =   600
            Width           =   1695
         End
         Begin VB.CommandButton cmdExit 
            Caption         =   "Exit"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   600
            TabIndex        =   15
            Top             =   5520
            Width           =   2055
         End
         Begin VB.CommandButton cmdUpdate 
            Caption         =   "Update Drink"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   5040
            TabIndex        =   14
            Top             =   600
            Width           =   2055
         End
         Begin VB.CommandButton cmdOrder 
            Caption         =   "Order"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   2520
            TabIndex        =   13
            Top             =   600
            Width           =   2055
         End
         Begin VB.CommandButton cmdAddNewOrder 
            Caption         =   " Add New Order"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   0
            TabIndex        =   12
            Top             =   600
            Width           =   2055
         End
      End
      Begin VB.Frame Frame2 
         BackColor       =   &H000000C0&
         Caption         =   "Coke Drink"
         BeginProperty Font 
            Name            =   "Comic Sans MS"
            Size            =   11.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         ForeColor       =   &H8000000F&
         Height          =   4095
         Left            =   600
         TabIndex        =   3
         Top             =   2400
         Width           =   9735
         Begin VB.ComboBox Combo1 
            Height          =   315
            Left            =   2520
            TabIndex        =   17
            Text            =   "Combo1"
            Top             =   3240
            Width           =   3495
         End
         Begin VB.ComboBox cboTypez 
            DataField       =   "Type"
            DataMember      =   "Coke"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form2.frx":0000
            Left            =   2640
            List            =   "Form2.frx":000A
            TabIndex        =   10
            Top             =   1320
            Width           =   3375
         End
         Begin VB.ComboBox cboQuantity 
            DataField       =   "Quantity"
            DataMember      =   "Coke"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form2.frx":001F
            Left            =   2640
            List            =   "Form2.frx":0041
            TabIndex        =   9
            Top             =   2160
            Width           =   3375
         End
         Begin VB.ComboBox cboType 
            DataField       =   "DrinkName"
            DataMember      =   "Coke"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form2.frx":008C
            Left            =   2640
            List            =   "Form2.frx":00A2
            TabIndex        =   8
            Top             =   240
            Width           =   3375
         End
         Begin VB.Label Label4 
            BackColor       =   &H000000C0&
            Caption         =   "Type"
            BeginProperty Font 
               Name            =   "Pristina"
               Size            =   14.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            ForeColor       =   &H8000000F&
            Height          =   495
            Left            =   240
            TabIndex        =   7
            Top             =   1440
            Width           =   1455
         End
         Begin VB.Label Label3 
            BackColor       =   &H000000C0&
            Caption         =   "Quantity in Mls"
            BeginProperty Font 
               Name            =   "Pristina"
               Size            =   14.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            ForeColor       =   &H8000000F&
            Height          =   615
            Left            =   240
            TabIndex        =   6
            Top             =   2280
            Width           =   1935
         End
         Begin VB.Label Label2 
            BackColor       =   &H000000C0&
            Caption         =   "Price Tag"
            BeginProperty Font 
               Name            =   "Pristina"
               Size            =   14.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            ForeColor       =   &H8000000F&
            Height          =   375
            Left            =   240
            TabIndex        =   5
            Top             =   3120
            Width           =   1215
         End
         Begin VB.Label Label1 
            BackColor       =   &H000000C0&
            Caption         =   "Drink Type"
            BeginProperty Font 
               Name            =   "Pristina"
               Size            =   14.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            ForeColor       =   &H8000000F&
            Height          =   495
            Left            =   120
            TabIndex        =   4
            Top             =   480
            Width           =   1575
         End
      End
      Begin VB.PictureBox Picture2 
         Height          =   2175
         Left            =   17760
         Picture         =   "Form2.frx":0117
         ScaleHeight     =   2115
         ScaleWidth      =   2235
         TabIndex        =   2
         Top             =   120
         Width           =   2295
      End
      Begin VB.PictureBox Picture1 
         BackColor       =   &H008080FF&
         Height          =   1935
         Left            =   240
         Picture         =   "Form2.frx":3F28
         ScaleHeight     =   1875
         ScaleWidth      =   6075
         TabIndex        =   1
         Top             =   240
         Width           =   6135
      End
   End
End
Attribute VB_Name = "Form2"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub cmdAddNewOrder_Click()
DataEnvironment1.rsCoke.AddNew
End Sub

Private Sub cmdDelete_Click()
DataEnvironment1.rsCoke.Delete
MsgBox "The Menu has been Cleared"
End Sub

Private Sub cmdExit_Click()
MDIForm1.Show
Unload Me

End Sub

Private Sub cmdOrder_Click()
DataEnvironment1.rsCoke.AddNew
MsgBox "The Order for Coke has been made"
End Sub

Private Sub cmdUpdate_Click()
DataEnvironment1.rsCoke.Update
MsgBox "The Coke Menu has been Updated"
End Sub

Private Sub Command1_Click()
MDIForm1.Show
Me.Hide
End Sub

