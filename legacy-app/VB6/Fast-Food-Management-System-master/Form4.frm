VERSION 5.00
Begin VB.Form Form4 
   Caption         =   "Form4"
   ClientHeight    =   8565
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   11505
   LinkTopic       =   "Form4"
   ScaleHeight     =   8565
   ScaleWidth      =   11505
   StartUpPosition =   3  'Windows Default
   WindowState     =   2  'Maximized
   Begin VB.Frame Frame1 
      BackColor       =   &H0000C000&
      Height          =   10935
      Left            =   0
      TabIndex        =   0
      Top             =   0
      Width           =   20295
      Begin VB.Frame Frame3 
         BackColor       =   &H0000C000&
         Height          =   1575
         Left            =   240
         TabIndex        =   14
         Top             =   7680
         Width           =   10815
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
            Left            =   8400
            TabIndex        =   19
            Top             =   480
            Width           =   1815
         End
         Begin VB.CommandButton cmdDelete 
            Caption         =   "Clear Menu"
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
            Left            =   6360
            TabIndex        =   18
            Top             =   480
            Width           =   1815
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
            Height          =   495
            Left            =   4200
            TabIndex        =   17
            Top             =   480
            Width           =   1815
         End
         Begin VB.CommandButton cmdOrder 
            Caption         =   "Order Pizza"
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
            Left            =   2040
            TabIndex        =   16
            Top             =   480
            Width           =   1815
         End
         Begin VB.CommandButton cmdAddNew 
            Caption         =   "Add New"
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
            Left            =   0
            TabIndex        =   15
            Top             =   480
            Width           =   1935
         End
      End
      Begin VB.Frame Frame2 
         BackColor       =   &H0000C000&
         Caption         =   "Order Pizza Today"
         BeginProperty Font 
            Name            =   "Comic Sans MS"
            Size            =   11.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   4815
         Left            =   240
         TabIndex        =   3
         Top             =   2760
         Width           =   7815
         Begin VB.ComboBox cboDescription 
            DataField       =   "PizzaDescription"
            DataMember      =   "Pizza"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form4.frx":0000
            Left            =   2520
            List            =   "Form4.frx":0019
            TabIndex        =   13
            Top             =   600
            Width           =   3615
         End
         Begin VB.ComboBox cboCashier 
            DataField       =   "CashierName"
            DataMember      =   "Pizza"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form4.frx":0099
            Left            =   2520
            List            =   "Form4.frx":00A0
            TabIndex        =   12
            Top             =   4080
            Width           =   3735
         End
         Begin VB.TextBox txtTotalAmount 
            DataField       =   "TotalAmount"
            DataMember      =   "Pizza"
            DataSource      =   "DataEnvironment1"
            Height          =   1095
            Left            =   2400
            TabIndex        =   11
            Top             =   2160
            Width           =   1815
         End
         Begin VB.ComboBox cboUnitPrice 
            DataField       =   "UnitPrice"
            DataMember      =   "Pizza"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form4.frx":00B5
            Left            =   2400
            List            =   "Form4.frx":00CE
            TabIndex        =   10
            Top             =   1800
            Width           =   3615
         End
         Begin VB.TextBox txtUnit 
            DataField       =   "Unit"
            DataMember      =   "Pizza"
            DataSource      =   "DataEnvironment1"
            Height          =   375
            Left            =   2400
            TabIndex        =   9
            Top             =   1320
            Width           =   3615
         End
         Begin VB.Label Label5 
            BackColor       =   &H0000C000&
            Caption         =   "Total Amount"
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
            Left            =   240
            TabIndex        =   8
            Top             =   2400
            Width           =   1695
         End
         Begin VB.Label Label2 
            BackColor       =   &H0000C000&
            Caption         =   "Unit"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   255
            Left            =   120
            TabIndex        =   7
            Top             =   1200
            Width           =   1455
         End
         Begin VB.Label Label4 
            BackColor       =   &H0000C000&
            Caption         =   "Cashier Name"
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
            TabIndex        =   6
            Top             =   4080
            Width           =   2055
         End
         Begin VB.Label Label3 
            BackColor       =   &H0000C000&
            Caption         =   "Unit Price"
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
            Left            =   120
            TabIndex        =   5
            Top             =   1800
            Width           =   1335
         End
         Begin VB.Label Label1 
            BackColor       =   &H0000C000&
            Caption         =   "Pizza Description"
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
            Left            =   120
            TabIndex        =   4
            Top             =   480
            Width           =   2055
         End
      End
      Begin VB.PictureBox Picture2 
         Height          =   2535
         Left            =   3240
         Picture         =   "Form4.frx":00F5
         ScaleHeight     =   2475
         ScaleWidth      =   2355
         TabIndex        =   2
         Top             =   240
         Width           =   2415
      End
      Begin VB.PictureBox Picture1 
         Height          =   2535
         Left            =   240
         Picture         =   "Form4.frx":40D8
         ScaleHeight     =   2475
         ScaleWidth      =   2955
         TabIndex        =   1
         Top             =   240
         Width           =   3015
      End
   End
End
Attribute VB_Name = "Form4"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub Text1_Change()

End Sub

Private Sub cmdAddNew_Click()
.rsPizza.AddNew
End Sub

Private Sub cmdDelete_Click()
DataEnvironment1.rsPizza.Delete
MsgBox "The Pizza Menu has been Cleared"
End Sub

Private Sub cmdExit_Click()
MDIForm1.Show
Unload Me

End Sub

Private Sub cmdOrder_Click()
DataEnvironment1.rsBurger.AddNew
MsgBox "The Order has Been Made"
End Sub

Private Sub cmdUpdate_Click()
DataEnvironment1.rsPizza.Update
MsgBox "The Pizza Menu Has Been Updated"
End Sub

