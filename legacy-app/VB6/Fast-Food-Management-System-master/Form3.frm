VERSION 5.00
Begin VB.Form Form3 
   Caption         =   "Form3"
   ClientHeight    =   8145
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   10770
   LinkTopic       =   "Form3"
   ScaleHeight     =   8145
   ScaleWidth      =   10770
   StartUpPosition =   3  'Windows Default
   WindowState     =   2  'Maximized
   Begin VB.Frame Frame1 
      BackColor       =   &H000080FF&
      Height          =   11760
      Left            =   120
      TabIndex        =   0
      Top             =   0
      Width           =   20295
      Begin VB.Frame Frame3 
         BackColor       =   &H000080FF&
         Height          =   1695
         Left            =   240
         TabIndex        =   4
         Top             =   7080
         Width           =   10935
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
            Height          =   495
            Left            =   9000
            TabIndex        =   9
            Top             =   600
            Width           =   1455
         End
         Begin VB.CommandButton cmdDelete 
            Caption         =   "Clear History"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   495
            Left            =   6720
            TabIndex        =   8
            Top             =   600
            Width           =   1575
         End
         Begin VB.CommandButton cmdUpdate 
            Caption         =   "Update MyList"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   495
            Left            =   4440
            TabIndex        =   7
            Top             =   600
            Width           =   1815
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
            Height          =   495
            Left            =   2520
            TabIndex        =   6
            Top             =   600
            Width           =   1575
         End
         Begin VB.CommandButton cmdAddNew 
            Caption         =   "Add New Burger"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   495
            Left            =   360
            TabIndex        =   5
            Top             =   600
            Width           =   1815
         End
      End
      Begin VB.Frame Frame2 
         BackColor       =   &H000080FF&
         Caption         =   "Burger"
         BeginProperty Font 
            Name            =   "Comic Sans MS"
            Size            =   11.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   4335
         Left            =   240
         TabIndex        =   3
         Top             =   2640
         Width           =   10095
         Begin VB.ComboBox cboCashier 
            DataField       =   "Cashier"
            DataMember      =   "Burger"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form3.frx":0000
            Left            =   4200
            List            =   "Form3.frx":0007
            TabIndex        =   17
            Top             =   3000
            Width           =   3495
         End
         Begin VB.ComboBox cboServedwith 
            DataField       =   "ServedWith"
            DataMember      =   "Burger"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form3.frx":001C
            Left            =   4320
            List            =   "Form3.frx":0035
            TabIndex        =   15
            Top             =   2160
            Width           =   3495
         End
         Begin VB.ComboBox cboWeight 
            DataField       =   "WeightOfBurger"
            DataMember      =   "Burger"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form3.frx":0075
            Left            =   4320
            List            =   "Form3.frx":009D
            TabIndex        =   13
            Top             =   1320
            Width           =   3495
         End
         Begin VB.ComboBox cboBurger 
            DataField       =   "TypeofBurger"
            DataMember      =   "Burger"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form3.frx":0104
            Left            =   4320
            List            =   "Form3.frx":0120
            TabIndex        =   12
            Top             =   720
            Width           =   3495
         End
         Begin VB.Label Label5 
            BackColor       =   &H000080FF&
            Caption         =   "Cashier"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   495
            Left            =   360
            TabIndex        =   16
            Top             =   2880
            Width           =   1695
         End
         Begin VB.Label Label4 
            BackColor       =   &H000080FF&
            Caption         =   "Served With"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   360
            TabIndex        =   14
            Top             =   2160
            Width           =   1455
         End
         Begin VB.Label Label2 
            BackColor       =   &H000080FF&
            Caption         =   "Price Tag"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   360
            TabIndex        =   11
            Top             =   1440
            Width           =   1335
         End
         Begin VB.Label Label1 
            BackColor       =   &H000080FF&
            Caption         =   "Type of Burger"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   360
            TabIndex        =   10
            Top             =   840
            Width           =   1935
         End
      End
      Begin VB.PictureBox Picture2 
         Height          =   2175
         Left            =   360
         Picture         =   "Form3.frx":01A7
         ScaleHeight     =   2115
         ScaleWidth      =   3795
         TabIndex        =   2
         Top             =   240
         Width           =   3855
      End
      Begin VB.PictureBox Picture1 
         Height          =   2175
         Left            =   4200
         Picture         =   "Form3.frx":591E
         ScaleHeight     =   2115
         ScaleWidth      =   2955
         TabIndex        =   1
         Top             =   240
         Width           =   3015
      End
   End
End
Attribute VB_Name = "Form3"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub cmdAddNew_Click()
DataEnvironment1.rsBurger.AddNew
End Sub

Private Sub cmdDelete_Click()
DataEnvironment1.rsBurger.Delete
MsgBox "The Menu has been Cleared"
End Sub

Private Sub cmdExit_Click()
MDIForm1.Show
Unload Me

End Sub

Private Sub cmdOrder_Click()
DataEnvironment1.rsBurger.AddNew
MsgBox "The Burger has been Ordered"
End Sub

Private Sub cmdUpdate_Click()
DataEnvironment1.rsBurger.Update
MsgBox "The Menu has been Updated"
End Sub

Private Sub Label3_Click()

End Sub
