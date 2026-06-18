VERSION 5.00
Begin VB.Form frmLogin 
   BorderStyle     =   3  'Fixed Dialog
   Caption         =   "Login"
   ClientHeight    =   7710
   ClientLeft      =   2835
   ClientTop       =   3480
   ClientWidth     =   13185
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   4555.322
   ScaleMode       =   0  'User
   ScaleWidth      =   12380
   ShowInTaskbar   =   0   'False
   StartUpPosition =   2  'CenterScreen
   Begin VB.Frame Frame1 
      BackColor       =   &H00C000C0&
      Height          =   7695
      Left            =   0
      TabIndex        =   0
      Top             =   0
      Width           =   13215
      Begin VB.PictureBox Picture1 
         Height          =   3135
         Left            =   240
         Picture         =   "frmLogin.frx":0000
         ScaleHeight     =   3075
         ScaleWidth      =   4155
         TabIndex        =   8
         Top             =   2040
         Width           =   4215
      End
      Begin VB.CommandButton cmdCancel 
         Caption         =   "Cancel"
         BeginProperty Font 
            Name            =   "Pristina"
            Size            =   14.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   9360
         TabIndex        =   7
         Top             =   5040
         Width           =   1455
      End
      Begin VB.CommandButton cmdOK 
         Caption         =   "Login"
         BeginProperty Font 
            Name            =   "Pristina"
            Size            =   14.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   7080
         TabIndex        =   6
         Top             =   5040
         Width           =   1335
      End
      Begin VB.TextBox txtPassword 
         BeginProperty Font 
            Name            =   "Pristina"
            Size            =   14.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         IMEMode         =   3  'DISABLE
         Left            =   7200
         PasswordChar    =   "*"
         TabIndex        =   5
         Top             =   3600
         Width           =   3615
      End
      Begin VB.TextBox txtUsername 
         BeginProperty Font 
            Name            =   "Pristina"
            Size            =   14.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   7200
         TabIndex        =   4
         Top             =   2640
         Width           =   3615
      End
      Begin VB.Label Label3 
         BackColor       =   &H00C000C0&
         Caption         =   "Password"
         BeginProperty Font 
            Name            =   "Pristina"
            Size            =   18
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   4800
         TabIndex        =   3
         Top             =   3720
         Width           =   1935
      End
      Begin VB.Label Label2 
         BackColor       =   &H00C000C0&
         Caption         =   "Username"
         BeginProperty Font 
            Name            =   "Pristina"
            Size            =   18
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   4800
         TabIndex        =   2
         Top             =   2640
         Width           =   1935
      End
      Begin VB.Label Label1 
         BackColor       =   &H00C000C0&
         Caption         =   "Deboneirs Pizza"
         BeginProperty Font 
            Name            =   "Pristina"
            Size            =   27.75
            Charset         =   0
            Weight          =   700
            Underline       =   -1  'True
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   1335
         Left            =   4080
         TabIndex        =   1
         Top             =   480
         Width           =   6255
      End
   End
End
Attribute VB_Name = "frmLogin"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Option Explicit

Public LoginSucceeded As Boolean

Private Sub cmdCancel_Click()
    'set the global var to false
    'to denote a failed login
    LoginSucceeded = False
    Me.Hide
End Sub

Private Sub cmdOK_Click()
If txtUsername = "dorry" And txtPassword = "dorry" Then
    
     MsgBox "WELCOME TO Deboneirs Inn System"
     
   MDIForm1.Show
    Me.Visible = False
    
    ElseIf txtUsername = "timmo" And txtPassword = "dorry" Then
    MsgBox "WELCOME TO Deboneirs Inn System"
   MDIForm1.Show
    Me.Visible = False
    
    ElseIf txtUsername = "" Then
    MsgBox "Enter the User name"
    ElseIf txtPassword = "" Then
    MsgBox "Enter the Password"
              LoginSucceeded = True
      Else
      MsgBox "INVALID PASSWORD OR USERNAME,PLEASE TRY AGAIN!!!", , "LOGIN"
      txtPassword.SetFocus
       SendKeys "{Home}+{End}"
       End If
       
End Sub

