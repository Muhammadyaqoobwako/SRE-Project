VERSION 5.00
Begin VB.Form Form6 
   Caption         =   "Form6"
   ClientHeight    =   8970
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   11370
   LinkTopic       =   "Form6"
   ScaleHeight     =   8970
   ScaleWidth      =   11370
   StartUpPosition =   3  'Windows Default
   WindowState     =   2  'Maximized
   Begin VB.Frame Frame1 
      BackColor       =   &H0080FFFF&
      Height          =   10935
      Left            =   -600
      TabIndex        =   0
      Top             =   0
      Width           =   20295
      Begin VB.Frame Frame3 
         BackColor       =   &H0080FFFF&
         Height          =   1455
         Left            =   240
         TabIndex        =   4
         Top             =   9360
         Width           =   10695
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
            Left            =   8640
            TabIndex        =   9
            Top             =   480
            Width           =   1455
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
            Left            =   6480
            TabIndex        =   8
            Top             =   480
            Width           =   1455
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
            Left            =   4440
            TabIndex        =   7
            Top             =   480
            Width           =   1575
         End
         Begin VB.CommandButton cmdSave 
            Caption         =   "Order Chips"
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
            Left            =   2280
            TabIndex        =   6
            Top             =   480
            Width           =   1695
         End
         Begin VB.CommandButton cmdAddNew 
            Caption         =   "AddNew Order"
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
            Left            =   240
            TabIndex        =   5
            Top             =   480
            Width           =   1695
         End
      End
      Begin VB.Frame Frame2 
         BackColor       =   &H0080FFFF&
         Caption         =   "Chips TakeAway"
         BeginProperty Font 
            Name            =   "Pristina"
            Size            =   14.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   3375
         Left            =   0
         TabIndex        =   3
         Top             =   3480
         Width           =   8055
         Begin VB.CommandButton Command1 
            Caption         =   "SUM"
            Height          =   495
            Left            =   6240
            TabIndex        =   18
            Top             =   2040
            Width           =   1215
         End
         Begin VB.TextBox txtUnit 
            DataField       =   "Unit"
            DataMember      =   "Chips"
            DataSource      =   "DataEnvironment1"
            Height          =   375
            Left            =   2280
            TabIndex        =   17
            Top             =   240
            Width           =   3615
         End
         Begin VB.ComboBox Combo3 
            DataField       =   "UnitPrice"
            DataMember      =   "Chips"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form6.frx":0000
            Left            =   2280
            List            =   "Form6.frx":0019
            TabIndex        =   16
            Top             =   840
            Width           =   3615
         End
         Begin VB.TextBox txtTotalAmount 
            DataField       =   "TotalAmount"
            DataMember      =   "Chips"
            DataSource      =   "DataEnvironment1"
            Height          =   855
            Left            =   2400
            TabIndex        =   15
            Top             =   1320
            Width           =   1815
         End
         Begin VB.ComboBox cboCashier 
            DataField       =   "Cashier"
            DataMember      =   "Chips"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form6.frx":0040
            Left            =   1920
            List            =   "Form6.frx":0047
            TabIndex        =   14
            Top             =   2880
            Width           =   3615
         End
         Begin VB.Label Label5 
            BackColor       =   &H0080FFFF&
            Caption         =   "Cashier"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   120
            TabIndex        =   13
            Top             =   2760
            Width           =   1575
         End
         Begin VB.Label Label3 
            BackColor       =   &H0080FFFF&
            Caption         =   "Total Amount"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   120
            TabIndex        =   12
            Top             =   1560
            Width           =   1335
         End
         Begin VB.Label Label2 
            BackColor       =   &H0080FFFF&
            Caption         =   "Unit Price"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   120
            TabIndex        =   11
            Top             =   960
            Width           =   1455
         End
         Begin VB.Label Label1 
            BackColor       =   &H0080FFFF&
            Caption         =   "Unit"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   240
            TabIndex        =   10
            Top             =   360
            Width           =   1335
         End
      End
      Begin VB.PictureBox Picture2 
         Height          =   2775
         Left            =   4080
         Picture         =   "Form6.frx":005B
         ScaleHeight     =   2715
         ScaleWidth      =   3675
         TabIndex        =   2
         Top             =   240
         Width           =   3735
      End
      Begin VB.PictureBox Picture1 
         Height          =   2775
         Left            =   120
         Picture         =   "Form6.frx":284F
         ScaleHeight     =   2715
         ScaleWidth      =   4035
         TabIndex        =   1
         Top             =   240
         Width           =   4095
      End
   End
End
Attribute VB_Name = "Form6"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub cmdAddNew_Click()
'DataEnvironment1.rsChips.AddNew
End Sub

Private Sub cmdDelete_Click()
DataEnvironment1.rsChips.Delete
MsgBox "The Chips Menu has been Cleared"
End Sub

Private Sub cmdExit_Click()
MDIForm1.Show
Unload Me

End Sub

Private Sub cmdSave_Click()
DataEnvironment1.rsChips.AddNew
MsgBox "Chips Order Has Been Made"
End Sub

Private Sub cmdUpdate_Click()
DataEnvironment1.rsChips.Update
MsgBox "The Chips Menu Has Been Updated"
End Sub

Private Sub Command1_Click()
If txtUnit.Text <> "" And Combo3.Text <> "" Then
txtTotalAmount.Text = Val(txtUnit.Text) + Val(Combo3.Text)
End If

End Sub

